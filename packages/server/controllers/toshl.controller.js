const apiToshl = require('../vendor-apis/toshl');
const toshlStorage = require('../storage/toshl.storage');
const moment = require('moment');
const uuidv4 = require('uuid/v4');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getEntries,
  adapter
};

const DefaultTime = '12:00:00';

function getOAuthUrl() {
  return apiToshl.oauth.url();
}

function authenticate(code) {
  return apiToshl.oauth.token(code)
    .then(data => {
      const expiry_time = calculateExpiryTime(data.expires_in);
      return { expiry_time, ...data };
    });
}

function deauthorize(auth) {
  return apiToshl.oauth.deauthorize(auth)
    .then(() => { toshlStorage.delete(auth.access_token); });
}

function refreshAuth(auth) {
  return apiToshl.oauth.refresh(auth)
    .then(data => {
      // Clear cache identified by old access_token
      toshlStorage.delete(auth.access_token);
      const expiry_time = calculateExpiryTime(data.expires_in);
      return { expiry_time, ...data };
    });
}

function getTags (token) {
  let storedData = toshlStorage.get(token);
  const storedTags = storedData && storedData.tags;
  if (storedTags) {
    return Promise.resolve(storedTags);
  } else {
    return apiToshl.tags.list(token)
      .then(tags => {
        // Map the array of tags to an object and store
        storedData = toshlStorage.create(token);
        storedData.tags = tags.reduce((map, tag) => (map[tag.id] = tag.name, map), {});
        return storedData;
      })
      .then(toshlStorage.update)
      .then(() => storedData.tags);
  }
}

function getEntries (from, to, token) {
  var decoratedEntries;
  return apiToshl.entries.list(from, to, token)
    .then(entries => { decoratedEntries = entries })
    .then(() => getTags(token))
    .then(tags => {
      decoratedEntries.forEach(decoratedEntry => {
        decoratedEntry.tags = decoratedEntry.tags.map(tagId => {
          return { id: tagId, name: tags[tagId] || 'No tag' };
        });
      });
      return decoratedEntries;
    });
}

function adapter (entries) {
  return entries.map(entry => {
    const type = entry.amount < 0 ? 'expense' : 'income';
    const tags = entry.tags.map(tag => tag.name).join(', ');
    const time = extractTimeString(entry.desc) || DefaultTime;
    const timeStart = moment(`${entry.date} ${time}`).unix();
    const timeEnd = timeStart;
    const locationStart = entry.location ? { latitude: entry.location.latitude, longitude: entry.location.longitude } : null;
    const locationEnd = locationStart;
    const description = startsWithTime(entry.desc) ? entry.desc.split('\n').slice(2).join('\n') : entry.desc;
    const amount = formatAmount(entry.amount, entry.currency.code);
    return {
      source: 'toshl',
      id: uuidv4(),
      type,
      timeStart,
      timeEnd,
      title: tags,
      valueLabel: amount,
      description,
      locationStart,
      locationEnd,
      polyline: null
    }
  })
}

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}

// TODO: Dynamically calculate the user's locale instead of hardcoding en-AU
const formatAmount = (amount, currencyCode) => {
  return Math.abs(amount).toLocaleString(
    'en-AU', { style: 'currency', currency: currencyCode }
  );
}

// This will extract the first found match regardless of what else is in the input.
const TIME_FORMAT_REGEX = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;
function extractTimeString(input) {
  const match = input.match(TIME_FORMAT_REGEX);
  var isValid;
  if (match && match.length) {
    const timeElements = match[0].split(':');
    const hour = parseInt(timeElements[0], 10);
    const minute = parseInt(timeElements[1], 10);
    const second = parseInt(timeElements[2], 10);
    isValid = (hour >= 0 && hour < 24) && (minute >= 0 && minute < 60) && (second >= 0 && second < 60);
  }

  return isValid ? match[0] : null;
}

function startsWithTime(string) {
  return TIME_FORMAT_REGEX.test(string.substr(0, 8));
}

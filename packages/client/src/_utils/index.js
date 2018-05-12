export default {
  getQueryParams,
  addQueryParams,
  extractTimeString,
  getTwentyFourHourTime,
  startsWithTime,
  makeRandomString,
  encode,
  decode
};

function getQueryParams(searchString) {
  const queryString = searchString && searchString.split('?') && searchString.split('?')[1];
  if (queryString) {
    const paramPairs = queryString.split('&');
    const params = {};
    paramPairs.forEach(paramPair => {
      const key = decodeURIComponent(paramPair.split('=')[0]);
      const value = decodeURIComponent(paramPair.split('=')[1]);
      params[key] = value;
    });
    return params;
  } else {
    return;
  }
};

function addQueryParams(url, params) {
  const existingParams = getQueryParams(url);
  const allParams = { ...existingParams, ...params }
  const keys = Object.keys(allParams);
  const pairs = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key])}`)
  const queryString = pairs.join('&');
  const baseUrl = url.split('?')[0];
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
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

function getTwentyFourHourTime (ISOString) {
  const stringToMatch = ISOString || new Date().toISOString();
  const timeMatch = stringToMatch.match(TIME_FORMAT_REGEX);
  return timeMatch.length ? timeMatch[0] : null;
}

function startsWithTime(string) {
  return TIME_FORMAT_REGEX.test(string.substr(0, 8));
}

function makeRandomString(length) {
  return Math.random().toString(36).substr(2, length);
}

function encode(obj) {
  return btoa(JSON.stringify(obj));
}

function decode(string) {
  // HACK: URI decoding the input string because Toshl encodes the state param it receives.
  // However, this is probably a good check regardless. Who knows what types of string can be thrown at this function.
  // Follow up in https://github.com/mzogheib/quoll/issues/16
  return JSON.parse(atob(decodeURIComponent(string)));
}
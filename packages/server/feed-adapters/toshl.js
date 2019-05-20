const moment = require('moment')
const uuidv4 = require('uuid/v4')

module.exports = {
  adapter,
}

const DefaultTime = '12:00:00'

function adapter(entries) {
  return entries.map(entry => {
    const type = entry.amount < 0 ? 'expense' : 'income'
    const tags = entry.tags.map(tag => tag.name).join(', ')
    const time = extractTimeString(entry.desc) || DefaultTime
    const timeStart = moment(`${entry.date} ${time}`).unix()
    const timeEnd = timeStart
    const locationStart = entry.location
      ? {
          latitude: entry.location.latitude,
          longitude: entry.location.longitude,
        }
      : null
    const locationEnd = locationStart
    const description = startsWithTime(entry.desc)
      ? entry.desc
          .split('\n')
          .slice(2)
          .join('\n')
      : entry.desc
    const amount = formatAmount(entry.amount, entry.currency.code)
    return {
      feed: 'toshl',
      id: uuidv4(),
      type,
      timeStart,
      timeEnd,
      title: tags,
      valueLabel: amount,
      description,
      locationStart,
      locationEnd,
      polyline: null,
    }
  })
}

// TODO: Dynamically calculate the user's locale instead of hardcoding en-AU
const formatAmount = (amount, currencyCode) => {
  return Math.abs(amount).toLocaleString('en-AU', {
    style: 'currency',
    currency: currencyCode,
  })
}

// This will extract the first found match regardless of what else is in the input.
const TIME_FORMAT_REGEX = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/
function extractTimeString(input) {
  const match = input.match(TIME_FORMAT_REGEX)
  var isValid
  if (match && match.length) {
    const timeElements = match[0].split(':')
    const hour = parseInt(timeElements[0], 10)
    const minute = parseInt(timeElements[1], 10)
    const second = parseInt(timeElements[2], 10)
    isValid =
      hour >= 0 &&
      hour < 24 &&
      (minute >= 0 && minute < 60) &&
      (second >= 0 && second < 60)
  }

  return isValid ? match[0] : null
}

function startsWithTime(string) {
  return TIME_FORMAT_REGEX.test(string.substr(0, 8))
}

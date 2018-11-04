const moment = require('moment')
const uuidv4 = require('uuid/v4')

module.exports = {
  adapter,
}
const Activities = {
  car: { type: 'car', label: 'Car' },
}

function adapter(entries) {
  return entries.filter(entry => entry.status === 'completed').map(entry => {
    const type = Activities.car.type
    const timeStart = entry.start_time
    const timeEnd = entry.end_time
    // Location data is at the city level only. No trip details.
    const locationStart = null
    const locationEnd = null
    const description = `Trip in ${entry.start_city.display_name}`
    const amount = formatDuration(timeEnd - timeStart)
    return {
      source: 'uber',
      id: uuidv4(),
      type,
      timeStart,
      timeEnd,
      title: 'Uber',
      valueLabel: amount,
      description,
      locationStart,
      locationEnd,
      polyline: null,
    }
  })
}

const formatDuration = duration => {
  const hours = duration / 60 / 60
  if (hours < 1) {
    const minutes = (hours - Math.floor(hours)) * 60
    return `${Math.floor(minutes)} m`
  } else {
    const minutes = (hours - Math.floor(hours)) * 60
    return `${Math.floor(hours)} h ${Math.floor(minutes)} m`
  }
}

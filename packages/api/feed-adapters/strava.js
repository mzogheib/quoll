const moment = require('moment')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  adapter,
}

const Activities = {
  Ride: { type: 'bike', label: 'Bike' },
  Run: { type: 'run', label: 'Run' },
  Walk: { type: 'walk', label: 'Walk' },
  Hike: { type: 'hike', label: 'Hike' },
  Yoga: { type: 'yoga', label: 'Yoga' },
  EBikeRide: { type: 'e-bike', label: 'E-Bike' },
}

function adapter(activities) {
  return activities.map((activity) => {
    const type = Activities[activity.type]
      ? Activities[activity.type].type
      : activity.type
    const title = Activities[activity.type]
      ? Activities[activity.type].label
      : activity.type
    const distance = formatDistance(activity.distance)
    const timeStart = moment(activity.start_date).unix()
    const timeEnd = timeStart + activity.elapsed_time * 1000
    const description = activity.description
    const locationStart = activity.start_latlng && {
      latitude: activity.start_latlng[0],
      longitude: activity.start_latlng[1],
    }
    const locationEnd = activity.end_latlng && {
      latitude: activity.end_latlng[0],
      longitude: activity.end_latlng[1],
    }
    const polyline = activity.map.polyline

    return {
      feed: 'strava',
      id: uuidv4(),
      type,
      timeStart,
      timeEnd,
      title,
      valueLabel: distance,
      description,
      locationStart,
      locationEnd,
      polyline,
    }
  })
}

const formatDistance = (distance) => {
  const kms = (distance / 1000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${kms} km`
}

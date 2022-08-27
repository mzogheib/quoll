import moment from 'moment'
import api from './api'
import feeds from './feeds'

const EntryConfig = {
  home: { label: 'Home', image: '🏠' },
  work: { label: 'Work', image: '🏭' },
  place: { label: 'Place', image: '🏬' },
  walk: { label: 'Walk', image: '🚶‍♂️' },
  hike: { label: 'Hike', image: '🥾' },
  bike: { label: 'Bike', image: '🚲' },
  run: { label: 'Run', image: '🏃‍♂️' },
  transport: { label: 'Transport', image: '⏩' },
  car: { label: 'Car', image: '🚗' },
  motorcycle: { label: 'Motorcycle', image: '🏍️' },
  tram: { label: 'Tram', image: '🚊' },
  train: { label: 'Train', image: '🚆' },
  bus: { label: 'Bus', image: '🚌' },
  expense: { label: 'Expense', image: '💸' },
  yoga: { label: 'Yoga', image: '🧘‍♂️' },
}

const get = (date) =>
  api
    .get({
      endpoint: 'timeline',
      params: {
        from: moment(date).startOf('day').toISOString(),
        to: moment(date).endOf('day').toISOString(),
      },
    })
    .then((entries) =>
      entries.map((entry) => {
        const entryConfig = EntryConfig[entry.type]
        const feedConfig = feeds.find((feed) => feed.name === entry.feed)
        return {
          ...entry,
          logo: feedConfig && feedConfig.imageConnected,
          image: (entryConfig && entryConfig.image) || '🤷‍♂️',
        }
      })
    )

const timelineService = {
  get,
}

export default timelineService

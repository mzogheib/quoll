import api from './api'
import feeds from './feeds'

const EntryConfig = {
  home: { label: 'Home', image: '🏠' },
  work: { label: 'Work', image: '🏭' },
  place: { label: 'Place', image: '🏬' },
  walk: { label: 'Walk', image: '🚶‍♂️' },
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

const get = date =>
  api
    .get({ endpoint: 'feed', params: { from: date, to: date } })
    .then(entries =>
      entries.map(entry => {
        const entryConfig = EntryConfig[entry.type]
        const feedConfig = feeds.find(feed => feed.name === entry.source)
        return {
          ...entry,
          logo: feedConfig && feedConfig.imageConnected,
          image: (entryConfig && entryConfig.image) || '🤷‍♂️',
        }
      })
    )

export default {
  get,
}

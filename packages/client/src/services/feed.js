import api from './api'
import dataSources from './data-sources'

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
        const sourceConfig = dataSources.find(
          dataSource => dataSource.name === entry.source
        )
        return {
          ...entry,
          logo: sourceConfig && sourceConfig.imageConnected,
          image: (entryConfig && entryConfig.image) || '🤷‍♂️',
        }
      })
    )

export default {
  get,
}

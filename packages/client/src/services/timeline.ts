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

enum StravaEntryType {
  Bike = 'bike',
  Run = 'run',
  Walk = 'walk',
  Hike = 'hike',
  Yoga = 'yoga',
}

interface StravaEntry {
  feed: 'strava'
  id: string
  type: StravaEntryType
  timeStart: string
  timeEnd: string
  title: string
  valueLabel: string
  description: string
  locationStart: number
  locationEnd: number
  polyline: string
}

enum ToshlEntryType {
  Expense = 'expense',
}

interface ToshlEntry {
  feed: 'toshl'
  id: string
  type: ToshlEntryType
  timeStart: string
  timeEnd: string
  title: string
  valueLabel: string
  description: string
  locationStart: number
  locationEnd: number
  polyline: null
}

enum UberEntryType {
  Car = 'car',
}

interface UberEntry {
  feed: 'uber'
  id: string
  type: UberEntryType
  timeStart: string
  timeEnd: string
  title: 'Uber'
  valueLabel: string
  description: string
  locationStart: number
  locationEnd: number
  polyline: null
}

enum MovesEntryType {
  Car = 'car',
  Walk = 'walk',
  Transport = 'transport',
  Motorcycle = 'motorcycle',
  Tram = 'tram',
  Train = 'train',
  Bus = 'bus',
}

interface MovesEntry {
  feed: 'moves'
  id: string
  type: MovesEntryType
  timeStart: string
  timeEnd: string
  title: 'Uber'
  valueLabel: string
  description: null
  locationStart: number
  locationEnd: number
  polyline: null
}

type Entry = StravaEntry | ToshlEntry | UberEntry | MovesEntry

const get = (date: string) =>
  api
    .get<Entry[]>({
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

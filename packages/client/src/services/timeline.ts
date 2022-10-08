import moment from 'moment'

import api from './api'
import { FeedName } from './feeds/types'

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

export const getEntryImage = (entry: Entry) => EntryConfig[entry.type].image

enum StravaEntryType {
  Bike = 'bike',
  Run = 'run',
  Walk = 'walk',
  Hike = 'hike',
  Yoga = 'yoga',
}

interface StravaEntry {
  feed: FeedName.Strava
  id: string
  type: StravaEntryType
  timeStart: number
  timeEnd: number
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
  feed: FeedName.Toshl
  id: string
  type: ToshlEntryType
  timeStart: number
  timeEnd: number
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
  feed: FeedName.Uber
  id: string
  type: UberEntryType
  timeStart: number
  timeEnd: number
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
  feed: FeedName.Moves
  id: string
  type: MovesEntryType
  timeStart: number
  timeEnd: number
  title: 'Uber'
  valueLabel: string
  description: null
  locationStart: number
  locationEnd: number
  polyline: null
}

export type Entry = StravaEntry | ToshlEntry | UberEntry | MovesEntry

const get = (date: string) =>
  api.get<Entry[]>({
    endpoint: 'timeline',
    params: {
      from: moment(date).startOf('day').toISOString(),
      to: moment(date).endOf('day').toISOString(),
    },
  })

const timelineService = {
  get,
}

export default timelineService

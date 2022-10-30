import moment from 'moment'

import api from './api'
import { FeedName } from './feeds/types'

enum EntryType {
  Bike = 'bike',
  Bus = 'bus',
  Car = 'car',
  Expense = 'expense',
  Hike = 'hike',
  Home = 'home',
  Motorcycle = 'motorcycle',
  Place = 'place',
  Run = 'run',
  Train = 'train',
  Tram = 'tram',
  Transport = 'transport',
  Walk = 'walk',
  Work = 'work',
  Yoga = 'yoga',
}

interface EntryLocation {
  latitude?: number
  longitude?: number
}

export interface Entry {
  id: string
  feed: FeedName
  type: EntryType
  timeStart: number
  timeEnd: number
  title: string
  valueLabel: string
  description: string | null
  locationStart: EntryLocation
  locationEnd: EntryLocation
  polyline: string | null
}

const EntryConfig = {
  [EntryType.Bike]: { label: 'Bike', image: '🚲' },
  [EntryType.Bus]: { label: 'Bus', image: '🚌' },
  [EntryType.Car]: { label: 'Car', image: '🚗' },
  [EntryType.Expense]: { label: 'Expense', image: '💸' },
  [EntryType.Hike]: { label: 'Hike', image: '🥾' },
  [EntryType.Home]: { label: 'Home', image: '🏠' },
  [EntryType.Motorcycle]: { label: 'Motorcycle', image: '🏍️' },
  [EntryType.Place]: { label: 'Place', image: '🏬' },
  [EntryType.Run]: { label: 'Run', image: '🏃‍♂️' },
  [EntryType.Train]: { label: 'Train', image: '🚆' },
  [EntryType.Tram]: { label: 'Tram', image: '🚊' },
  [EntryType.Transport]: { label: 'Transport', image: '⏩' },
  [EntryType.Walk]: { label: 'Walk', image: '🚶‍♂️' },
  [EntryType.Work]: { label: 'Work', image: '🏭' },
  [EntryType.Yoga]: { label: 'Yoga', image: '🧘‍♂️' },
}

export const getEntryImage = (entry: Entry) => EntryConfig[entry.type].image

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

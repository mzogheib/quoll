import { FeedName } from '../services/feeds/types'

export const feedConfig = {
  [FeedName.Toshl]: {
    title: 'Toshl',
    link: { url: 'https://toshl.com', label: 'toshl.com' },
  },
  [FeedName.Strava]: {
    title: 'Strava',
    link: { url: 'https://www.strava.com', label: 'www.strava.com' },
  },
  [FeedName.Uber]: {
    title: 'Uber',
    link: { url: 'https://www.uber.com', label: 'www.uber.com' },
  },
  [FeedName.Moves]: {
    title: 'Moves',
    link: { url: 'https://www.moves-app.com', label: 'www.moves-app.com' },
  },
}

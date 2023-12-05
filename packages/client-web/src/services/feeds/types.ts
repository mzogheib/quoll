export enum FeedName {
  Strava = 'strava',
  Toshl = 'toshl',
  Uber = 'uber',
  Moves = 'moves',
}

export interface AuthenticatePayload {
  code: string
}

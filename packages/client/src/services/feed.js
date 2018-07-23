import api from './api';

const sourceConfig = {
  strava: {
    link: { url: 'https://www.strava.com', label: 'www.strava.com' },
    image: require('./images/strava-96x96.png'),
  },
  moves: {
    link: { url: 'https://www.moves-app.com', label: 'www.moves-app.com' },
    image: require('./images/moves-206x206.png'),

  },
  toshl: {
    link: { url: 'https://toshl.com', label: 'toshl.com' },
    image: require('./images/toshl-196x196.png'),
  }
};

const EntryTypes = { 
  home: { label: 'Home', image: '🏠' },
  work: { label: 'Work', image: '🏭' },
  place: { label: 'Place', image: '🏬' },
  walk: { label: 'Walk' , image: '🚶‍♂️' },
  bike: { label: 'Bike' , image: '🚲' },
  run: { label: 'Run' , image: '🏃‍♂️' },
  transport: { label: 'Transport', image: '✌️' },
  car: { label: 'Car', image: '🚗' },
  motorcycle: { label: 'Motorcycle', image: '🏍️' },
  tram: { label: 'Tram', image: '🚊' },
  train: { label: 'Train', image: '🚆' },
  bus: { label: 'Bus', image: '🚌' },
  expense: { label: 'Expense', image: '💸' },
};

const get = date => api.get({ endpoint: 'feed', params: { from: date, to: date } }).then(entries => entries.map(entry => ({
  ...entry,
  logo: sourceConfig[entry.source].image,
  image: EntryTypes[entry.type].image,
})));

export default {
  get
};
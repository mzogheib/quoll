import api from './api';

const SourceConfig = {
  strava: {
    image: require('./images/strava-96x96.png'),
  },
  moves: {
    image: require('./images/moves-206x206.png'),

  },
  toshl: {
    image: require('./images/toshl-196x196.png'),
  }
};

const EntryConfig = { 
  home: { label: 'Home', image: '🏠' },
  work: { label: 'Work', image: '🏭' },
  place: { label: 'Place', image: '🏬' },
  walk: { label: 'Walk' , image: '🚶‍♂️' },
  bike: { label: 'Bike' , image: '🚲' },
  run: { label: 'Run' , image: '🏃‍♂️' },
  transport: { label: 'Transport', image: '⏩' },
  car: { label: 'Car', image: '🚗' },
  motorcycle: { label: 'Motorcycle', image: '🏍️' },
  tram: { label: 'Tram', image: '🚊' },
  train: { label: 'Train', image: '🚆' },
  bus: { label: 'Bus', image: '🚌' },
  expense: { label: 'Expense', image: '💸' },
  yoga: { label: 'Yoga', image: '🧘‍♂️' },
};

const get = date => api.get({ endpoint: 'feed', params: { from: date, to: date } })
  .then(entries => entries.map(entry => {
    const entryConfig = EntryConfig[entry.type];
    const sourceConfig = SourceConfig[entry.source];
    return ({
      ...entry,
      logo: sourceConfig.image,
      image: (entryConfig && entryConfig.image) || '🤷‍♂️',
    })
  }));

export default {
  get
};
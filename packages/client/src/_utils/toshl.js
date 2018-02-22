import Api from './api';
import mapUtils from '../map/utils';

const oAuthUrl = 'http://localhost:3000/fake-oauth?redirect_uri=http://localhost:3000&state=toshl';
const authenticate = () => { return Promise.resolve() };
const deauthorize = () => { return Promise.resolve() };
const getEntries = params => Api.get('toshl', params);

const getMarkersFromEntries = entries => {
  return entries.filter(entry => entry.location)
    .map(entry => {
      // Assume dollars and get negative amount because toshl expenses are represented as negative values
      const title = `$${-entry.amount}`;
      return mapUtils.makeMarker({
        longitude: entry.location.longitude, latitude: entry.location.latitude, title: title
      });
    })
};

export default {
  oAuthUrl,
  authenticate,
  deauthorize,
  getEntries,
  getMarkersFromEntries
};
import Api from './api';
import mapUtils from '../map/utils';

const getEntries = params => Api.get('toshl', params);

const convertEntriesToMarkers = entries => {
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
  getEntries,
  convertEntriesToMarkers
};
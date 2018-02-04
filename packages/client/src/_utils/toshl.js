import Api from './api';

const getEntries = params => Api.get('toshl', params);

const convertEntriesToLocations = entries => {
    let locations = [];
    entries.filter(entry => entry.location)
      .forEach(entry => {
        let location = locations.find(loc => loc.latitude === entry.location.latitude && loc.longitude === entry.location.longitude);
        if (location) {
          location.total += entry.amount;
        } else {
          locations.push({
            latitude: entry.location.latitude,
            longitude: entry.location.longitude,
            total: entry.amount
          });
        }
      });
    // Multiple total by -1 because toshl expenses are represented as negative values
    return locations.map(location => { location.total *= -1; return location });
};

export default {
    getEntries,
    convertEntriesToLocations
};
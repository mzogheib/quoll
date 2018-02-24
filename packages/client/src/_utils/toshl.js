import Api from './api';
import mapUtils from '../map/utils';
import utils from '.';

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

const summarizeData = entries => {
  return entries.map(entry => {
    const timeLabel = utils.extractTimeString(entry.desc) || '12:00:00';
    const timeStamp = new Date(`${entry.date} ${timeLabel}`);

    const tags = entry.tags.join(', ');
    const label = entry.category + (tags ? ', ' + tags : '');

    const value = Math.abs(entry.amount).toLocaleString(
      'en-AU', { style: 'currency', currency: entry.currency.code }
    );

    return {
      timeStamp: timeStamp.getTime(),
      timeLabel: timeLabel,
      label: label,
      value: value
    };
  })
  .sort((a, b) => a.timeStamp - b.timeStamp);
}

export default {
  oAuthUrl,
  authenticate,
  deauthorize,
  getEntries,
  getMarkersFromEntries,
  summarizeData
};
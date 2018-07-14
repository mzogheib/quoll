import api from '../api';
import utils from '../utils';
import config from './config';
import moment from 'moment';

const DefaultTime = '12:00:00';

const getOauthUrl  = () => api.get({ endpoint: 'feed-auth', params: { source: 'toshl' }});
const authenticate = payload => api.post({ endpoint: 'feed-auth', payload, params: { source: 'toshl' }});
const deauthorize = () => api.delete({ endpoint: 'feed-auth', params: { source: 'toshl' }});
const getEntries = params => api.get({ endpoint: 'toshl', params });

const makeMapData = entries => {
  return entries.filter(entry => entry.location).map(entry => {
    const tags = entry.tags.map(tag => tag.name).join(', ');
    const amount = formatAmount(entry.amount, entry.currency.code);
    const time = utils.extractTimeString(entry.desc) || DefaultTime;
    const description = utils.startsWithTime(entry.desc) ? entry.desc.split('\n').slice(2).join('\n') : entry.desc;
    return {
      id: entry.id,
      latitude: entry.location.latitude,
      longitude: entry.location.longitude,
      title: `${tags} ${amount}`,
      subTitle: moment(`${entry.date} ${time}`).format('h:mm a'),
      description: description
    };
  });
};

// TODO: Dynamically calculate the user's locale instead of hardcoding en-AU
const formatAmount = (amount, currencyCode) => {
  return Math.abs(amount).toLocaleString(
    'en-AU', { style: 'currency', currency: currencyCode }
  );
}

const makeEntries = entries => {
  return entries.map(entry => {
    const toshlConfig = config.find(c => c.id === 'toshl');
    const time = utils.extractTimeString(entry.desc) || DefaultTime;
    const label = entry.tags.map(tag => tag.name).join(', ');
    const value = formatAmount(entry.amount, entry.currency.code);

    return {
      id: entry.id,
      logo: toshlConfig.image,
      timeStamp: moment(`${entry.date} ${time}`).unix(),
      timeLabel: moment(`${entry.date} ${time}`).format('h:mm a'),
      image: '💸',
      label,
      value
    };
  })
  .sort((a, b) => a.timeStamp - b.timeStamp);
};

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
  getEntries,
  makeMapData,
  makeEntries
};
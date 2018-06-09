import { combineReducers } from 'redux';
import user from './user';
import date from './date';
import focussedItemId from './focussed-item';
import feeds from './feeds';

export default combineReducers({
  user,
  date,
  focussedItemId,
  feeds
});
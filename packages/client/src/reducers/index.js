import { combineReducers } from 'redux';
import date from './date';
import focussedItemId from './focussed-item';
import feeds from './feeds';

export default combineReducers({
  date,
  focussedItemId,
  feeds
});
import { combineReducers } from 'redux';
import date from './date';
import focussedItemId from './focussed-item';

export default combineReducers({
  date,
  focussedItemId
});
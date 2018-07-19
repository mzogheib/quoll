import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import date from './date';
import focussedItemId from './focussed-item';
import feeds from './feeds';
import feed from './feed';

const reducer = combineReducers({
  user,
  date,
  focussedItemId,
  feeds,
  feed
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

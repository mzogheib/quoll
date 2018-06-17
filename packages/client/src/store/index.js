import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import routeTitle from './route-title';
import date from './date';
import focussedItemId from './focussed-item';
import feeds from './feeds';

const reducer = combineReducers({
  user,
  routeTitle,
  date,
  focussedItemId,
  feeds
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

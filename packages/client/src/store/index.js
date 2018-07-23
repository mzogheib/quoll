import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import date from './date';
import focussedItemId from './focussed-item';
import dataSources from './dataSources';
import feed from './feed';

const reducer = combineReducers({
  user,
  date,
  focussedItemId,
  dataSources,
  feed
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

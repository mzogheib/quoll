import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import date from './date'
import focussedItem from './focussed-item'
import feeds from './feeds'
import timeline from './timeline'

const reducer = combineReducers({
  user,
  date,
  focussedItem,
  feeds,
  timeline,
})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export type RootState = ReturnType<typeof store.getState>

export default store

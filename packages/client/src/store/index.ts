import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
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

// https://github.com/zalmoxisus/redux-devtools-extension#11-basic-store
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export type GetState = typeof store.getState
export type RootState = ReturnType<GetState>
export type AppDispatch = typeof store.dispatch

export default store

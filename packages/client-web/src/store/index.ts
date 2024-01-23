import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "./user";
import date from "./date";
import feeds from "./feeds";
import timeline from "../modules/timeline/model";

const reducer = combineReducers({
  user,
  date,
  feeds,
  timeline,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export type GetState = typeof store.getState;
export type RootState = ReturnType<GetState>;
export type AppDispatch = typeof store.dispatch;

export default store;

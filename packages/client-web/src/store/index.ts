import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "./user";
import date from "./date";
import feeds from "./feeds";
import timeline from "../modules/timeline/model/store";

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

export default store;

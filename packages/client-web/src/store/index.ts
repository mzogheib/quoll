import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "modules/user/model/store";
import date from "modules/date/model/store";
import feeds from "modules/feeds/model/store";
import timeline from "modules/timeline/model/store";

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

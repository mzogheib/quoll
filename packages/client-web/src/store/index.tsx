import { legacy_createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer as userReducer, UserState } from "modules/user/model/store";
import { reducer as dateReducer, DateState } from "modules/date/model/store";
import { reducer as feedsReducer, FeedsState } from "modules/feeds/model/store";
import {
  reducer as timelineReducer,
  TimelineState,
} from "modules/timeline/model/store";
import { ReactNode } from "react";

const reducer = combineReducers({
  userReducer,
  dateReducer,
  feedsReducer,
  timelineReducer,
});

const store = legacy_createStore(reducer, composeWithDevTools());

export type RootState = {
  user: UserState;
  date: DateState;
  feeds: FeedsState;
  timeline: TimelineState;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

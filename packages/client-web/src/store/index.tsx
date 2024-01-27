import { ReactNode } from "react";
import { legacy_createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer as user, UserState } from "modules/user/model/store";
import { reducer as date, DateState } from "modules/date/model/store";
import { reducer as feeds, FeedsState } from "modules/feeds/model/store";
import {
  reducer as timeline,
  TimelineState,
} from "modules/timeline/model/store";

const reducer = combineReducers({
  user,
  date,
  feeds,
  timeline,
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

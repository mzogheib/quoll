import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import user, { UserState } from "modules/user/model/store";
import date, { DateState } from "modules/date/model/store";
import feeds, { FeedsState } from "modules/feeds/model/store";
import timeline, { TimelineState } from "modules/timeline/model/store";
import { ReactNode } from "react";

const reducer = combineReducers({
  user,
  date,
  feeds,
  timeline,
});

const store = createStore(reducer, composeWithDevTools());

export type RootState = {
  user: UserState;
  date: DateState;
  feeds: FeedsState;
  timeline: TimelineState;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

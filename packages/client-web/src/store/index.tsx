import { ReactNode } from "react";
import { legacy_createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import * as userStore from "modules/user/model/store";
import * as dateStore from "modules/date/model/store";
import * as feedsStore from "modules/feeds/model/store";
import * as timelineStore from "modules/timeline/model/store";

const reducer = combineReducers({
  user: userStore.useStore,
  date: dateStore.useStore,
  feeds: feedsStore.useStore,
  timeline: timelineStore.useStore,
});

const store = legacy_createStore(reducer, composeWithDevTools());

export type RootState = {
  user: userStore.State;
  date: dateStore.State;
  feeds: feedsStore.State;
  timeline: timelineStore.State;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

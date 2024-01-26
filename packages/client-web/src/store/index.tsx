import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import user from "modules/user/model/store";
import date from "modules/date/model/store";
import feeds from "modules/feeds/model/store";
import timeline from "modules/timeline/model/store";
import { ReactNode } from "react";

const reducer = combineReducers({
  user,
  date,
  feeds,
  timeline,
});

const store = createStore(reducer, composeWithDevTools());

type GetState = typeof store.getState;
export type RootState = ReturnType<GetState>;

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

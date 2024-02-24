import {
  DateState,
  FeedsState,
  TimelineState,
  UserState,
  makeGlobalReduxStore,
} from "@quoll/client-lib";

import * as userStore from "modules/user/model/store";
import { dateStore } from "modules/date/model";
import * as feedsStore from "modules/feeds/model/store";
import { timelineStore } from "modules/timeline/model";

export type RootState = {
  user: UserState;
  date: DateState;
  feeds: FeedsState;
  timeline: TimelineState;
};

export const { StoreProvider } = makeGlobalReduxStore({
  user: userStore.reducer,
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
});

import {
  DateState,
  FeedsState,
  TimelineState,
  UserState,
  makeGlobalReduxStore,
} from "@quoll/client-lib";

import { userStore } from "modules/user/model";
import { dateStore } from "modules/date/model";
import { feedsStore } from "modules/feeds/model";
import { timelineStore } from "modules/timeline/model";

export type RootState = {
  date: DateState;
  feeds: FeedsState;
  timeline: TimelineState;
  user: UserState;
};

export const { StoreProvider } = makeGlobalReduxStore({
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
  user: userStore.reducer,
});

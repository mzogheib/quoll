import {
  AuthUserState,
  DateState,
  FeedsState,
  TimelineState,
  makeGlobalReduxStore,
} from "@quoll/client-lib";

import { authUserStore } from "modules/auth-user/model";
import { dateStore } from "modules/date/model";
import { feedsStore } from "modules/feeds/model";
import { timelineStore } from "modules/timeline/model";

export type RootState = {
  date: DateState;
  feeds: FeedsState;
  timeline: TimelineState;
  authUser: AuthUserState;
};

export const { StoreProvider } = makeGlobalReduxStore({
  authUser: authUserStore.reducer,
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
});

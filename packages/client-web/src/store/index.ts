import {
  AuthUserState,
  DateState,
  FeedsState,
  TimelineState,
  UserState,
  makeGlobalReduxStore,
} from "@quoll/client-lib";

import { authUserStore } from "modules/auth-user/model";
import { userStore } from "modules/user/model";
import { dateStore } from "modules/date/model";
import { feedsStore } from "modules/feeds/model";
import { timelineStore } from "modules/timeline/model";

export type RootState = {
  date: DateState;
  feeds: FeedsState;
  timeline: TimelineState;
  user: UserState;
  authUser: AuthUserState;
};

export const { StoreProvider } = makeGlobalReduxStore({
  authUserStore: authUserStore.reducer,
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
  user: userStore.reducer,
});

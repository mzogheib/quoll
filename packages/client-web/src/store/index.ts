import {
  AuthUserState,
  DateState,
  FeedsState,
  TimelineState,
  UserState,
} from "@quoll/client-lib/modules";
import { makeGlobalReduxStore } from "@quoll/client-lib/store";

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
  authUser: authUserStore.reducer,
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
  user: userStore.reducer,
});

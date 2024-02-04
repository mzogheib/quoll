import { makeGlobalStore } from "@quoll/client-lib";
import { DateState } from "@quoll/client-lib";

import * as userStore from "modules/user/model/store";
import { dateStore } from "modules/date/model";
import * as feedsStore from "modules/feeds/model/store";
import * as timelineStore from "modules/timeline/model/store";

export type RootState = {
  user: userStore.State;
  date: DateState;
  feeds: feedsStore.State;
  timeline: timelineStore.State;
};

export const { StoreProvider } = makeGlobalStore({
  user: userStore.reducer,
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
});

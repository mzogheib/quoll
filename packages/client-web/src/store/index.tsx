import { createGlobalStore } from "@quoll/client-lib";

import * as userStore from "modules/user/model/store";
import * as dateStore from "modules/date/model/store";
import * as feedsStore from "modules/feeds/model/store";
import * as timelineStore from "modules/timeline/model/store";

export type RootState = {
  user: userStore.State;
  date: dateStore.State;
  feeds: feedsStore.State;
  timeline: timelineStore.State;
};

export const { StoreProvider } = createGlobalStore({
  user: userStore.reducer,
  date: dateStore.reducer,
  feeds: feedsStore.reducer,
  timeline: timelineStore.reducer,
});

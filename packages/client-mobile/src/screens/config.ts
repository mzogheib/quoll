import { ScreenName } from "./types";

type ScreenConfig = {
  title: string;
};

export const screenConfigMap: Record<ScreenName, ScreenConfig> = {
  home: {
    title: "Home",
  },
  settings: {
    title: "Settings",
  },
};

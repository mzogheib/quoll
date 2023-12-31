import { ScreenName } from "./types";

type ScreenConfig = {
  title: string;
  icon: string;
};

export const screenConfigMap: Record<ScreenName, ScreenConfig> = {
  home: {
    title: "Home",
    icon: "map",
  },
  settings: {
    title: "Settings",
    icon: "settings",
  },
};

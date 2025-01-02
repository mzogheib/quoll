import { service as stravaService } from "./strava/service";
import { service as toshlService } from "./toshl/service";

export const feedServices = {
  strava: stravaService,
  toshl: toshlService,
};

const supportedFeeds = Object.keys(feedServices);
type SupportedFeed = keyof typeof feedServices;

export const isSupportedFeed = (feed: string): feed is SupportedFeed =>
  supportedFeeds.includes(feed as SupportedFeed);

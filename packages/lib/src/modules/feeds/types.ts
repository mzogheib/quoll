export type FeedName = "media" | "strava" | "toshl";

export type FeedConnectionConfig =
  | {
      type: "oauth";
      data: { url: string };
    }
  | {
      type: "personal-token";
    };

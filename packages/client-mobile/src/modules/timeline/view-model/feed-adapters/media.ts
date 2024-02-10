import { MediaItem } from "@modules/media/types";
import { TimelineEntry, TimelineEntryType } from "@quoll/client-lib";

const getType = (mediaItem: MediaItem): TimelineEntryType => {
  switch (mediaItem.subTypes) {
    case "PhotoDepthEffect":
    case "PhotoHDR":
    case "PhotoLive":
    case "PhotoPanorama":
    case "PhotoScreenshot":
      return "photo";

    case "VideoHighFrameRate":
    case "VideoStreamed":
    case "VideoTimelapse":
      return "video";

    default:
      return "photo";
  }
};

export const mediaAdapter = (mediaItem: MediaItem): TimelineEntry => {
  const { timestamp } = mediaItem;
  const location = {
    latitude: mediaItem.location?.latitude,
    longitude: mediaItem.location?.longitude,
  };

  return {
    id: mediaItem.id,
    feed: "media",
    type: getType(mediaItem),
    timeStart: timestamp,
    timeEnd: timestamp,
    title: "Photo",
    valueLabel: "", // TODO make this optional or null,
    description: null,
    locationStart: location,
    locationEnd: location,
    polyline: null,
    mediaUri: mediaItem.image.uri,
  };
};

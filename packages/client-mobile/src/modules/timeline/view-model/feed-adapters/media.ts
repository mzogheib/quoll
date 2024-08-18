import { MediaItem } from "@modules/media/types";
import { TimelineEntry, TimelineEntryType } from "@quoll/lib/modules";

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
  const { timestamp, location } = mediaItem;
  const _location =
    location?.latitude && location.longitude
      ? {
          latitude: location.latitude,
          longitude: location.longitude,
        }
      : null;

  return {
    id: mediaItem.id,
    feed: "media",
    type: getType(mediaItem),
    timeStart: timestamp,
    timeEnd: timestamp,
    title: "Photo",
    valueLabel: "", // TODO make this optional or null,
    description: null,
    locationStart: _location,
    locationEnd: _location,
    polyline: null,
    mediaUri: mediaItem.image.uri,
  };
};

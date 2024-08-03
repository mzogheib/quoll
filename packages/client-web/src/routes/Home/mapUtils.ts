import {
  TimelineEntry,
  makeDateFromUnixTimestamp,
  makeTimeString,
} from "@quoll/lib";

import { MarkerConfig, PolylineConfig } from "components/Map/Component";
import { decodePath } from "components/Map/utils";

const mapElementColors = {
  default: "#eb4434",
  focussed: "#0072ff",
};

export const makePolylineConfigs = (
  entries: TimelineEntry[],
  focussedItemId: string | undefined,
  onClick: (id: string, latLng?: google.maps.LatLngLiteral) => void,
): PolylineConfig[] =>
  entries
    .filter((entry) => entry.polyline)
    .map((entry) => {
      const isFocussed = entry.id === focussedItemId;
      return {
        options: {
          // TypeScript can't seem to infer that polyline must be defined
          path: decodePath(entry.polyline as string),
          strokeWeight: 5,
          strokeColor: isFocussed
            ? mapElementColors.focussed
            : mapElementColors.default,
          zIndex: isFocussed ? 1000 : 1,
        },
        onClick: ({ latLng }) => onClick(entry.id, latLng?.toJSON()),
      };
    });

export const makeMarkerConfigs = (
  entries: TimelineEntry[],
  focussedItemId: string | undefined, // TODO
  onClick: (id: string, latLng?: google.maps.LatLngLiteral) => void,
): MarkerConfig[] =>
  entries
    .filter((entry) => !entry.polyline && entry.locationStart)
    .map((entry) => {
      return {
        options: {
          id: entry.id,
          position: {
            lat: entry.locationStart!.latitude, // Guaranteed by above filter
            lng: entry.locationStart!.longitude, // Guaranteed by above filter
          },
          title: entry.title,
          subTitle: makeTimeString(makeDateFromUnixTimestamp(entry.timeStart)),
          description: entry.description || "",
        },
        onClick: ({ latLng }) => onClick(entry.id, latLng?.toJSON()),
      };
    });

const makeInfoWindowPosition = ({
  locationStart,
  polyline: path,
}: TimelineEntry):
  | google.maps.LatLngLiteral
  | google.maps.LatLng
  | undefined => {
  if (locationStart) {
    return {
      lat: locationStart.latitude,
      lng: locationStart.longitude,
    };
  }

  if (path) {
    const polyline = new google.maps.Polyline();
    polyline.setPath(decodePath(path));

    return polyline.getPath().getArray()[0];
  }
};

export const makeInfoWindowOptions = (
  entry: TimelineEntry,
  position?: google.maps.LatLngLiteral,
): google.maps.InfoWindowOptions => {
  const { title, timeStart } = entry;

  const description = entry.description ?? "";
  const startDate = makeDateFromUnixTimestamp(timeStart);
  const subTitle = makeTimeString(startDate);

  const content =
    "<div>" +
    `<h1>${title}</h1>` +
    `<h2>${subTitle}</h2>` +
    `<p>${description.replace(/(?:\r\n|\r|\n)/g, "<br>")}</p>` +
    "</div>";

  return { content, position: position ?? makeInfoWindowPosition(entry) };
};

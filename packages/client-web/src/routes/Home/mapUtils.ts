import moment from "moment";

import { Entry } from "modules/timeline/types";
import { PolylineConfig } from "components/Map/Component";
import { decodePath } from "components/Map/utils";

const mapElementColors = {
  default: "#eb4434",
  focussed: "#0072ff",
};

export const makePolylineConfigs = (
  entries: Entry[],
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

// TODO
export const makeMarkerOptions = (
  entries: Entry[],
): google.maps.MarkerOptions[] =>
  entries
    .filter((entry) => !entry.polyline && entry.locationStart)
    .map((entry) => ({
      id: entry.id,
      latitude: entry.locationStart?.latitude,
      longitude: entry.locationEnd?.longitude,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format("h:mm a"),
      description: entry.description || "",
    }));

const makeInfoWindowPosition = ({
  locationStart,
  polyline: path,
}: Entry): google.maps.LatLngLiteral | google.maps.LatLng | undefined => {
  if (locationStart?.latitude && locationStart.longitude) {
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
  entry: Entry,
  position?: google.maps.LatLngLiteral,
): google.maps.InfoWindowOptions => {
  const { title, timeStart } = entry;

  const description = entry.description ?? "";
  const subTitle = moment.unix(timeStart).format("h:mm a");

  const content =
    "<div>" +
    `<h1>${title}</h1>` +
    `<h2>${subTitle}</h2>` +
    `<p>${description.replace(/(?:\r\n|\r|\n)/g, "<br>")}</p>` +
    "</div>";

  return { content, position: position ?? makeInfoWindowPosition(entry) };
};

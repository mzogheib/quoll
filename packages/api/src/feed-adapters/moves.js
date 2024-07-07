import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { encode } from "@mapbox/polyline";

const Activities = {
  walking: { type: "walk", label: "Walk" },
  transport: { type: "transport", label: "Transport" },
  car: { type: "car", label: "Car" },
  motorcycle: { type: "motorcycle", label: "Motorcycle" },
  tram: { type: "tram", label: "Tram" },
  train: { type: "train", label: "Train" },
  bus: { type: "bus", label: "Bus" },
};

export function adapter(segments) {
  return segments.map((segment) => {
    switch (segment.type) {
      case "move":
        const activities = segment.activities.filter(
          (activity) => Activities[activity.activity],
        );
        return activities.map((activity) => {
          const type = Activities[activity.activity].type;
          const title = Activities[activity.activity].label;
          const timeStart = moment(activity.startTime).unix();
          const timeEnd = moment(activity.endTime).unix();
          const distance = formatDistance(activity.distance);
          const encodedPath =
            activity.trackPoints.length &&
            encode(activity.trackPoints.map((point) => [point.lat, point.lon]));
          const startPoint =
            activity.trackPoints.length && activity.trackPoints[0];
          const endPoint =
            activity.trackPoints.length &&
            activity.trackPoints[activity.trackPoints.length - 1];
          const locationStart = {
            latitude: startPoint.lat,
            longitude: startPoint.lon,
          };
          const locationEnd = {
            latitude: endPoint.lat,
            longitude: endPoint.lon,
          };
          return {
            feed: "moves",
            id: uuidv4(),
            type,
            timeStart,
            timeEnd,
            title,
            valueLabel: distance,
            description: null,
            locationStart,
            locationEnd,
            polyline: encodedPath,
          };
        });
      case "place":
        const place = segment.place;
        const placeTypes = ["home", "work"];
        const title = `${place.name || "Place"}`;
        const timeStart = moment(segment.startTime).unix();
        const timeEnd = moment(segment.endTime).unix();
        const duration = formatDuration(
          moment(segment.endTime).diff(moment(segment.startTime)),
        );
        const locationStart = {
          latitude: place.location.lat,
          longitude: place.location.lon,
        };
        const locationEnd = locationStart;
        return [
          {
            feed: "moves",
            id: uuidv4(),
            type: placeTypes.includes(place.type) ? place.type : "place",
            timeStart,
            timeEnd,
            title,
            valueLabel: duration,
            description: null,
            locationStart,
            locationEnd,
            polyline: null,
          },
        ];
      default:
        return [];
    }
  });
}

const formatDistance = (distance) => {
  const kms = (distance / 1000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${kms} km`;
};

const formatDuration = (duration) => {
  const hours = duration / 1000 / 60 / 60;
  if (hours < 1) {
    const minutes = (hours - Math.floor(hours)) * 60;
    return `${Math.floor(minutes)} m`;
  } else {
    const minutes = (hours - Math.floor(hours)) * 60;
    return `${Math.floor(hours)} h ${Math.floor(minutes)} m`;
  }
};

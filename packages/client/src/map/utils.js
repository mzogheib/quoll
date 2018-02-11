const google = window.google;

export default {
  makeMarker
};

function makeMarker({longitude, latitude, title, map}) {
  const marker = { position: { lng: longitude, lat: latitude } };
  if (title) marker.title = title.toString();
  if (map) marker.map = map;
  return new google.maps.Marker(marker);
}
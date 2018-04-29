const google = window.google;

export default {
  makeMarker,
  makePolyline,
  makeInfoWindow
};

function makeMarker({longitude, latitude, title, map}) {
  const marker = { position: { lng: longitude, lat: latitude } };
  if (title) marker.title = title.toString();
  if (map) marker.map = map;
  return new google.maps.Marker(marker);
}

function decodePath(path) {
  return google.maps.geometry.encoding.decodePath(path);
}

function makePolyline({ encodedPath, map }) {
  const polyline = {
    path: decodePath(encodedPath),
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 5
  };
  if (map) polyline.map = map;
  return new google.maps.Polyline(polyline);
}

function makeInfoWindow({ title, subTitle, description }) {
  const contentString = '<div>' +
  `<h1>${title}</h1>` +
  `<h2>${subTitle}</h2>` +
  `<p>${description}</p>` +
  '</div>';
  return new google.maps.InfoWindow({
    content: contentString
  });
}
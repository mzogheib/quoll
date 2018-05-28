const google = window.google;
const Colors = {
  marker: {
    default: '#eb4434',
    highlighted: '#0072ff'
  },
  polyline: {
    default: '#eb4434',
    highlighted: '#0072ff'
  }
};

export default {
  Colors,
  makeMarker,
  highlightMarker,
  unHighlightMarker,
  makePolyline,
  highlightPolyline,
  unHighlightPolyline,
  makeInfoWindow
};

function makeMarker({longitude, latitude, title, map}) {
  const marker = { position: { lng: longitude, lat: latitude }, icon: `http://www.googlemapsmarkers.com/v1/${Colors.marker.default.substr(1)}` };
  if (title) marker.title = title.toString();
  if (map) marker.map = map;
  return new google.maps.Marker(marker);
}

function highlightMarker(marker) {
  marker.setOptions({ icon: `http://www.googlemapsmarkers.com/v1/${Colors.marker.highlighted.substr(1)}`, zIndex: 1000 });
}

function unHighlightMarker(marker) {
  marker.setOptions({ icon: `http://www.googlemapsmarkers.com/v1/${Colors.marker.default.substr(1)}`, zIndex: 500 });
}

function decodePath(path) {
  return google.maps.geometry.encoding.decodePath(path);
}

function makePolyline({ encodedPath, map }) {
  const polyline = {
    path: decodePath(encodedPath),
    geodesic: true,
    strokeColor: Colors.polyline.default,
    strokeOpacity: 1.0,
    strokeWeight: 5
  };
  if (map) polyline.map = map;
  return new google.maps.Polyline(polyline);
}

function highlightPolyline(polyline) {
  polyline.setOptions({ strokeColor: Colors.polyline.highlighted, zIndex: 1000 });
}

function unHighlightPolyline(polyline) {
  polyline.setOptions({ strokeColor: Colors.polyline.default, zIndex: 500  });
}

function makeInfoWindow({ title, subTitle, description }) {
  const contentString = '<div>' +
  `<h1>${title}</h1>` +
  `<h2>${subTitle}</h2>` +
  `<p>${description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>` +
  '</div>';
  return new google.maps.InfoWindow({
    content: contentString
  });
}
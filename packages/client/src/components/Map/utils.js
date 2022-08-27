const { google } = window
export const Colors = {
  marker: {
    default: '#eb4434',
    highlighted: '#0072ff',
  },
  polyline: {
    default: '#eb4434',
    highlighted: '#0072ff',
  },
}

const markersBaseUrl = 'http://www.googlemapsmarkers.com/v1/'

export const makeMarker = ({ longitude, latitude, title, map }) => {
  const marker = {
    position: { lng: longitude, lat: latitude },
    icon: `${markersBaseUrl}${Colors.marker.default.substr(1)}`,
  }
  if (title) marker.title = title.toString()
  if (map) marker.map = map
  return new google.maps.Marker(marker)
}

export const highlightMarker = (marker) => {
  marker.setOptions({
    icon: `${markersBaseUrl}${Colors.marker.highlighted.substr(1)}`,
    zIndex: 1000,
  })
}

export const unHighlightMarker = (marker) => {
  marker.setOptions({
    icon: `${markersBaseUrl}${Colors.marker.default.substr(1)}`,
    zIndex: 500,
  })
}

const decodePath = (path) => google.maps.geometry.encoding.decodePath(path)

export const makePolyline = ({ encodedPath, map }) => {
  const polyline = {
    path: decodePath(encodedPath),
    geodesic: true,
    strokeColor: Colors.polyline.default,
    strokeOpacity: 1.0,
    strokeWeight: 5,
  }
  if (map) polyline.map = map
  return new google.maps.Polyline(polyline)
}

export const highlightPolyline = (polyline) =>
  polyline.setOptions({
    strokeColor: Colors.polyline.highlighted,
    zIndex: 1000,
  })

export const unHighlightPolyline = (polyline) =>
  polyline.setOptions({ strokeColor: Colors.polyline.default, zIndex: 500 })

export const makeInfoWindow = ({ title, subTitle, description }) => {
  const contentString =
    '<div>' +
    `<h1>${title}</h1>` +
    `<h2>${subTitle}</h2>` +
    `<p>${description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>` +
    '</div>'
  return new google.maps.InfoWindow({
    content: contentString,
  })
}

export const makeBounds = (markers, polylines) => {
  const bounds = new window.google.maps.LatLngBounds()
  markers.forEach((marker) => bounds.extend(marker.getPosition()))
  polylines.forEach((polyline) =>
    polyline.getPath().forEach((position) => bounds.extend(position))
  )
  return bounds
}

export const makePolylineItems = (
  polylineData,
  map,
  onItemClick,
  onInfoWindowClose
) => {
  const polylineItems = polylineData.map((item) => ({
    id: item.id,
    polyline: makePolyline(item),
    infoWindow: makeInfoWindow(item),
  }))

  polylineItems.forEach(({ polyline, id, infoWindow }) => {
    polyline.setMap(map)
    polyline.addListener('click', (event) => {
      onItemClick(id, event.latLng.lat(), event.latLng.lng())
    })
    infoWindow.addListener('closeclick', () => {
      onInfoWindowClose()
    })
  })

  return polylineItems
}

export const makeMarkerItems = (
  markerData,
  map,
  onItemClick,
  onInfoWindowClose
) => {
  const markerItems = markerData.map((item) => ({
    id: item.id,
    marker: makeMarker(item),
    infoWindow: makeInfoWindow(item),
  }))

  markerItems.forEach(({ marker, id, infoWindow }) => {
    marker.setMap(map)
    marker.addListener('click', () => onItemClick(id))
    infoWindow.addListener('closeclick', () => onInfoWindowClose(undefined))
  })

  return markerItems
}

export const resetAllMapElements = (markerItems, polylineItems) => {
  markerItems.forEach(({ infoWindow, marker }) => {
    infoWindow.close()
    unHighlightMarker(marker)
  })
  polylineItems.forEach(({ infoWindow, polyline }) => {
    infoWindow.close()
    unHighlightPolyline(polyline)
  })
}

export const focussItem = (item, lat, lng, map) => {
  if (!map) {
    return
  }

  if (item.marker) {
    highlightMarker(item.marker)
    item.infoWindow.open(map, item.marker)
  } else {
    const infoWindowPosition =
      (lat && lng && { lat, lng }) || item.polyline.getPath().getArray()[0]
    highlightPolyline(item.polyline)
    item.infoWindow.setPosition(infoWindowPosition)
    item.infoWindow.open(map)
  }
}

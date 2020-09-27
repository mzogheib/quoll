import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  makeMarker,
  makePolyline,
  makeBounds,
  highlightMarker,
  highlightPolyline,
  unHighlightMarker,
  unHighlightPolyline,
  makeInfoWindow,
} from './utils'

// TODO: confirm if the hook dependency arrays are ok or not

const Wrapper = styled.div`
  height: 100%;
`

const Map = (props) => {
  const [map, setMap] = useState(null)
  const [polylineItems, setPolylineItems] = useState([])
  const [markerItems, setMarkerItems] = useState([])
  const mapElementRef = useRef(null)

  const makePolylineItems = (polylineData) => {
    const { onElementSelect } = props

    const polylineItems = polylineData.map((item) => ({
      id: item.id,
      polyline: makePolyline(item),
      infoWindow: makeInfoWindow(item),
    }))

    polylineItems.forEach(({ polyline, id, infoWindow }) => {
      polyline.setMap(map)
      polyline.addListener('click', (event) => {
        onElementSelect(id, event.latLng.lat(), event.latLng.lng())
      })
      infoWindow.addListener('closeclick', () => {
        onElementSelect(undefined)
      })
    })

    return polylineItems
  }

  const makeMarkerItems = (markerData) => {
    const { onElementSelect } = props

    const markerItems = markerData.map((item) => ({
      id: item.id,
      marker: makeMarker(item),
      infoWindow: makeInfoWindow(item),
    }))

    markerItems.forEach(({ marker, id, infoWindow }) => {
      marker.setMap(map)
      marker.addListener('click', () => onElementSelect(id))
      infoWindow.addListener('closeclick', () => onElementSelect(undefined))
    })

    return markerItems
  }

  const closeAllInfoWindows = () => {
    markerItems.forEach(({ infoWindow }) => infoWindow.close())
    polylineItems.forEach(({ infoWindow }) => infoWindow.close())
  }

  const resetMarkers = () =>
    markerItems.forEach(({ marker }) => unHighlightMarker(marker))

  const resetPolylines = () =>
    polylineItems.forEach(({ polyline }) => unHighlightPolyline(polyline))

  const resetAllMapElements = () => {
    closeAllInfoWindows()
    resetMarkers()
    resetPolylines()
  }

  const focussItem = (item, lat, lng) => {
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

  // Set the map on first render
  useEffect(() => {
    const melbourne = new window.google.maps.LatLng(-37.8079033, 144.9759344)
    setMap(
      new window.google.maps.Map(mapElementRef.current, {
        center: melbourne,
        zoom: 14,
        mapTypeId: 'roadmap',
      })
    )

    return () => {
      props.onElementSelect(undefined)
    }
  }, [])

  // Setup handlers when the map changes
  useEffect(() => {
    if (!map) {
      return
    }

    map.addListener('click', (event) => {
      if (event.placeId) props.onElementSelect(undefined)
    })
  }, [map])

  // Create and set new map items when data from props change
  const uniquePolylineDataReference = props.polylineData
    .map(({ id }) => id)
    .join('-')
  const uniqueMarkerDataReference = props.markerData
    .map(({ id }) => id)
    .join('-')

  useEffect(() => {
    polylineItems.forEach(({ polyline, infoWindow }) => {
      polyline.setMap(null)
      infoWindow.close()
    })
    setPolylineItems(makePolylineItems(props.polylineData))

    markerItems.forEach(({ marker, infoWindow }) => {
      marker.setMap(null)
      infoWindow.close()
    })
    setMarkerItems(makeMarkerItems(props.markerData))
  }, [uniquePolylineDataReference, uniqueMarkerDataReference])

  // Fit map to new map items
  const bounds = makeBounds(
    markerItems.map(({ marker }) => marker),
    polylineItems.map(({ polyline }) => polyline)
  )

  useEffect(() => {
    if (!map) {
      return
    }

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds)
    }
  }, [map, bounds.toString()])

  // Focus or unfocus map item
  const { focussedItem } = props
  useEffect(() => {
    const allItems = polylineItems.concat(markerItems)
    const item = allItems.find(({ id }) => id === focussedItem.id)
    resetAllMapElements()

    if (item) {
      focussItem(item, focussedItem.latitude, focussedItem.longitude)
    }
  }, [focussedItem.id, focussedItem.latitude, focussedItem.longitude])

  return <Wrapper ref={mapElementRef} />
}

Map.propTypes = {
  markerData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      description: PropTypes.string,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  polylineData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      description: PropTypes.string,
      encodedPath: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onElementSelect: PropTypes.func.isRequired,
  // TODO: should the entire focussedItem be undefined if not selected?
  // Currently its properties are undefined in that case.
  focussedItem: PropTypes.shape({
    id: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
}

export default Map

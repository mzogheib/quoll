import React, { Component } from 'react'
import './style.scss'
import mapUtils from './utils'
import _ from 'lodash'
const google = window.google

export default class Map extends Component {
  state = {
    markerItems: [],
    polylineItems: [],
  }

  componentDidMount() {
    const { markerData, polylineData } = this.props

    const melbourne = new google.maps.LatLng(-37.8079033, 144.9759344)
    this.map = new google.maps.Map(this.refs.map, {
      center: melbourne,
      zoom: 14,
      mapTypeId: 'roadmap',
    })

    this.map.addListener('click', event => {
      if (event.placeId) this.resetAllMapElements()
    })

    const markerItems = this.makeMarkerItems(markerData)
    const polylineItems = this.makePolylineItems(polylineData)
    const bounds = this.makeBounds(markerItems, polylineItems)
    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds)
    }
    this.setState({ markerItems, polylineItems })
  }

  componentWillUnmount() {
    this.props.onElementSelect(null)
  }

  componentDidUpdate(prevProps) {
    const { focussedItem, markerData, polylineData } = this.props
    this.resetAllMapElements()
    const allItems = this.state.markerItems.concat(this.state.polylineItems)
    const item = allItems.find(item => item.id === focussedItem.id)
    if (item) {
      this.focusItem(item, focussedItem.latitude, focussedItem.longitude)
    }

    // Remove existing markers and polylines then replace with new ones
    if (
      !_.isEqual(markerData, prevProps.markerData) ||
      !_.isEqual(polylineData, prevProps.polylineData)
    ) {
      this.state.markerItems.forEach(({ marker, infoWindow }) => {
        marker.setMap(null)
        infoWindow.close()
      })
      this.state.polylineItems.forEach(({ polyline, infoWindow }) => {
        polyline.setMap(null)
        infoWindow.close()
      })

      const markerItems = this.makeMarkerItems(markerData)
      const polylineItems = this.makePolylineItems(polylineData)
      const bounds = this.makeBounds(markerItems, polylineItems)

      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds)
      }

      this.setState({ markerItems, polylineItems })
    }
  }

  makeMarkerItems = markerData => {
    const { onElementSelect } = this.props

    const markerItems = markerData.map(item => ({
      id: item.id,
      marker: mapUtils.makeMarker(item),
      infoWindow: mapUtils.makeInfoWindow(item),
    }))

    markerItems.forEach(({ marker, id, infoWindow }) => {
      marker.setMap(this.map)
      marker.addListener('click', () => onElementSelect(id))
      infoWindow.addListener('closeclick', () => onElementSelect(null))
    })

    return markerItems
  }

  makePolylineItems = polylineData => {
    const { onElementSelect } = this.props

    const polylineItems = polylineData.map(item => ({
      id: item.id,
      polyline: mapUtils.makePolyline(item),
      infoWindow: mapUtils.makeInfoWindow(item),
    }))

    polylineItems.forEach(({ polyline, id, infoWindow }) => {
      polyline.setMap(this.map)
      polyline.addListener('click', event => {
        this.resetAllMapElements()
        onElementSelect(id, event.latLng.lat(), event.latLng.lng())
      })
      infoWindow.addListener('closeclick', () => {
        onElementSelect(null)
      })
    })

    return polylineItems
  }

  makeBounds = (markerItems, polylineItems) => {
    const bounds = new google.maps.LatLngBounds()
    markerItems.forEach(item => bounds.extend(item.marker.getPosition()))
    polylineItems.forEach(({ polyline }) =>
      polyline.getPath().forEach(position => bounds.extend(position))
    )
    return bounds
  }

  focusItem = (item, lat, lng) => {
    if (item.marker) {
      mapUtils.highlightMarker(item.marker)
      item.infoWindow.open(this.map, item.marker)
    } else {
      const infoWindowPosition =
        (lat && lng && { lat, lng }) || item.polyline.getPath().getArray()[0]
      mapUtils.highlightPolyline(item.polyline)
      item.infoWindow.setPosition(infoWindowPosition)
      item.infoWindow.open(this.map)
    }
  }

  resetAllMapElements = () => {
    this.closeAllInfoWindows()
    this.resetMarkers()
    this.resetPolylines()
  }

  closeAllInfoWindows = () => {
    this.state.markerItems.forEach(item => item.infoWindow.close())
    this.state.polylineItems.forEach(item => item.infoWindow.close())
  }

  resetMarkers = () => {
    this.state.markerItems.forEach(item =>
      mapUtils.unHighlightMarker(item.marker)
    )
  }

  resetPolylines = () =>
    this.state.polylineItems.forEach(({ polyline }) =>
      mapUtils.unHighlightPolyline(polyline)
    )

  render() {
    return <div className="map" ref="map" />
  }
}

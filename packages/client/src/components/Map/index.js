import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {
  makeMarker,
  makePolyline,
  highlightMarker,
  highlightPolyline,
  unHighlightMarker,
  unHighlightPolyline,
  makeInfoWindow,
} from './utils'

const google = window.google

const Wrapper = styled.div`
  height: 100%;
`

export default class Map extends Component {
  static propTypes = {
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
    // TODO: should the entire focussedItem be undefined if not selected?
    // Currently its properties are undefined in that case.
    focussedItem: PropTypes.shape({
      id: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
  }

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
      marker: makeMarker(item),
      infoWindow: makeInfoWindow(item),
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
      polyline: makePolyline(item),
      infoWindow: makeInfoWindow(item),
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
    markerItems.forEach(({ marker }) => bounds.extend(marker.getPosition()))
    polylineItems.forEach(({ polyline }) =>
      polyline.getPath().forEach(position => bounds.extend(position))
    )
    return bounds
  }

  focusItem = (item, lat, lng) => {
    if (item.marker) {
      highlightMarker(item.marker)
      item.infoWindow.open(this.map, item.marker)
    } else {
      const infoWindowPosition =
        (lat && lng && { lat, lng }) || item.polyline.getPath().getArray()[0]
      highlightPolyline(item.polyline)
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
    this.state.markerItems.forEach(({ infoWindow }) => infoWindow.close())
    this.state.polylineItems.forEach(({ infoWindow }) => infoWindow.close())
  }

  resetMarkers = () =>
    this.state.markerItems.forEach(({ marker }) => unHighlightMarker(marker))

  resetPolylines = () =>
    this.state.polylineItems.forEach(({ polyline }) =>
      unHighlightPolyline(polyline)
    )

  render() {
    return <Wrapper ref="map" />
  }
}

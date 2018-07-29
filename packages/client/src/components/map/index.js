import React from 'react';
import './style.css';
import mapUtils from './utils';
import _ from 'lodash';
const google = window.google;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerItems: [],
      polylineItems: []
    };
  }
  
  componentDidMount() {
    const melbourne = new google.maps.LatLng(-37.8079033, 144.9759344);
    this.map = new google.maps.Map(this.refs.map, {
      center: melbourne,
      zoom: 14,
      mapTypeId: 'roadmap',
    });

    this.map.addListener('click', event => {
      if (event.placeId) this.resetAllMapElements();
    });

    const markerItems = this.makeMarkerItems(this.props.markerData);
    const polylineItems = this.makePolylineItems(this.props.polylineData);
    const bounds = this.makeBounds(markerItems, polylineItems);
    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
    }
    this.setState({ markerItems, polylineItems });
  }

  componentWillUnmount() {
    this.props.onElementSelect(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.focussedItemId !== prevProps.focussedItemId) {
      this.resetAllMapElements();
      const allItems = this.state.markerItems.concat(this.state.polylineItems);
      const focussedItem = allItems.find(item => item.id === this.props.focussedItemId);
      if (focussedItem) {
        this.focusItem(focussedItem);
      }
    }

    // Remove existing markers and polylines then replace with new ones
    if (!_.isEqual(this.props.markerData, prevProps.markerData) || !_.isEqual(this.props.polylineData, prevProps.polylineData)) {
      this.state.markerItems.forEach(item => {
        item.marker.setMap(null);
        item.infoWindow.close();
      });
      this.state.polylineItems.forEach(item => {
        item.polyline.setMap(null);
        item.infoWindow.close();
      });
  
      const markerItems = this.makeMarkerItems(this.props.markerData);
      const polylineItems = this.makePolylineItems(this.props.polylineData);
      const bounds = this.makeBounds(markerItems, polylineItems);
  
      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      }
  
      this.setState({ markerItems, polylineItems });
    }
  }

  makeMarkerItems(markerData) {
    const markerItems = markerData.map(item => {
      return { id: item.id, marker: mapUtils.makeMarker(item), infoWindow: mapUtils.makeInfoWindow(item) };
    });

    markerItems.forEach(item => {
      item.marker.setMap(this.map);
      item.marker.addListener('click', () => {
        this.resetAllMapElements();
        this.props.onElementSelect(item.id);
      });
      item.infoWindow.addListener('closeclick', () => {
        this.resetAllMapElements();
        this.props.onElementSelect(null);
      });
    });

    return markerItems;
  }

  makePolylineItems(polylineData) {
    const polylineItems = polylineData.map(item => {
      return { id: item.id, polyline: mapUtils.makePolyline(item), infoWindow: mapUtils.makeInfoWindow(item) };
    });

    polylineItems.forEach(item => {
      item.polyline.setMap(this.map);
      item.polyline.addListener('click', event => {
        this.resetAllMapElements();
        this.props.onElementSelect(item.id); // TODO: support focussing at a particular lat lng
      });
      item.infoWindow.addListener('closeclick', () => {
        this.props.onElementSelect(null);
      });
    });

    return polylineItems;
  }

  makeBounds(markerItems, polylineItems) {
    const bounds = new google.maps.LatLngBounds();
    markerItems.forEach(item => bounds.extend(item.marker.getPosition()));
    polylineItems.forEach(item => item.polyline.getPath().forEach(position => bounds.extend(position)));
    return bounds;
  }

  focusItem(item, position) {
    if (item.marker) {
      mapUtils.highlightMarker(item.marker);
      item.infoWindow.open(this.map, item.marker);
    } else {
      const infoWindowPosition = position || item.polyline.getPath().getArray()[0];
      mapUtils.highlightPolyline(item.polyline)
      item.infoWindow.setPosition(infoWindowPosition);
      item.infoWindow.open(this.map);
    }
  }

  resetAllMapElements() {
    this.closeAllInfoWindows();
    this.resetMarkers();
    this.resetPolylines();
  }

  closeAllInfoWindows() {
    this.state.markerItems.forEach(item => item.infoWindow.close());
    this.state.polylineItems.forEach(item => item.infoWindow.close());
  }

  resetMarkers() {
    this.state.markerItems.forEach(item => mapUtils.unHighlightMarker(item.marker));
  }

  resetPolylines() {
    this.state.polylineItems.forEach(item => mapUtils.unHighlightPolyline(item.polyline));
  }

  render() {
    return (
      <div className='map' ref='map'></div>
    );
  }
};

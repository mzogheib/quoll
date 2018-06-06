import React from 'react';
import './style.css';
import mapUtils from './utils';
const google = window.google;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.bounds = new google.maps.LatLngBounds();
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
    if (!this.bounds.isEmpty()) {
      this.map.fitBounds(this.bounds);
    }
    this.setState({ markerItems, polylineItems });
  }

  componentWillReceiveProps(nextProps) {
    // TODO: do a better job of managing props and state here.
    // Markers and polylines are always being rebuilt even if just a focussedItemId change

    // Remove existing markers and polylines then replace with new ones
    this.state.markerItems.forEach(item => {
      item.marker.setMap(null);
      item.infoWindow.close();
    });
    this.state.polylineItems.forEach(item => {
      item.polyline.setMap(null);
      item.infoWindow.close();
    });

    const markerItems = this.makeMarkerItems(nextProps.markerData);
    const polylineItems = this.makePolylineItems(nextProps.polylineData);

    if (nextProps.focussedItemId) {
      const allItems = markerItems.concat(polylineItems);
      const focussedItem = allItems.find(item => item.id === nextProps.focussedItemId);
      if (focussedItem) {
        this.focusItem(focussedItem);
      }
    }

    if (!this.bounds.isEmpty()) {
      this.map.fitBounds(this.bounds);
    }

    this.setState({ markerItems, polylineItems });
  }

  makeMarkerItems(markerData) {
    const markerItems = markerData.map(item => {
      return { id: item.id, marker: mapUtils.makeMarker(item), infoWindow: mapUtils.makeInfoWindow(item) };
    });

    markerItems.forEach(item => {
      this.bounds.extend(item.marker.getPosition());
      item.marker.setMap(this.map);
      item.marker.addListener('click', () => {
        this.resetAllMapElements();
        this.focusItem(item);
      });
      item.infoWindow.addListener('closeclick', () => {
        this.resetAllMapElements();
      });
    });

    return markerItems;
  }

  makePolylineItems(polylineData) {
    const polylineItems = polylineData.map(item => {
      return { id: item.id, polyline: mapUtils.makePolyline(item), infoWindow: mapUtils.makeInfoWindow(item) };
    });

    polylineItems.forEach(item => {
      item.polyline.getPath().forEach(position => this.bounds.extend(position));
      item.polyline.setMap(this.map);
      item.polyline.addListener('click', event => {
        this.resetAllMapElements();
        this.focusItem(item, event.latLng);
      });
      item.infoWindow.addListener('closeclick', () => {
        this.resetAllMapElements();
      });
    });

    return polylineItems;
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

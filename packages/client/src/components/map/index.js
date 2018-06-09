import React from 'react';
import './style.css';
import mapUtils from './utils';
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
      const bounds = this.makeBounds(markerItems, polylineItems);
      
      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      }

      
      if (nextProps.focussedItemId) {
        const allItems = this.state.markerItems.concat(this.state.polylineItems);
        const focussedItem = allItems.find(item => item.id === nextProps.focussedItemId);
        if (focussedItem) {
          this.focusItem(focussedItem);
        }

      }

      this.setState({ markerItems, polylineItems });
  }

  makeMarkerItems(markerData) {
    const markerItems = markerData.map(item => {
      return { id: item.id, marker: mapUtils.makeMarker(item), infoWindow: mapUtils.makeInfoWindow(item) };
    });

    markerItems.forEach(item => {
      item.marker.setMap(this.map);
      item.marker.addListener('click', () => {
        this.resetAllMapElements();
        this.props.setFocussedItem(item.id);
      });
      item.infoWindow.addListener('closeclick', () => {
        this.resetAllMapElements();
        this.props.setFocussedItem(null);
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
        this.props.setFocussedItem(item.id); // TODO: support focussing at a particular lat lng
      });
      item.infoWindow.addListener('closeclick', () => {
        this.props.setFocussedItem(null);
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
    console.log(this.state.makeMarkerItems)
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

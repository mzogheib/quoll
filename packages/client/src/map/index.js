import React from 'react';
import './style.css';
import mapUtils from './utils';
import utils from './utils';
const google = window.google;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerLayers: [],
      polylineLayers: []
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

  }

  componentWillReceiveProps(nextProps) {
    // Remove existing markers and polylines then replace with new ones
    this.state.markerLayers.forEach(layer => layer.forEach(item => {
      item.marker.setMap(null);
      item.infoWindow.close();
    }));
    this.state.polylineLayers.forEach(layer => layer.forEach(item => { 
      item.polyline.setMap(null);
      item.infoWindow.close();
    }));

    this.setState({ markerLayers: [], polylineLayers: [] }, () => {
      const markerLayers = nextProps.markerDataLayers.map(layer => layer.map(item => {
        return { id: item.id, marker: mapUtils.makeMarker(item), infoWindow: mapUtils.makeInfoWindow(item) };
      }));
      const polylineLayers = nextProps.polylineDataLayers.map(layer => layer.map(item => {
        return { id: item.id, polyline: mapUtils.makePolyline(item), infoWindow: mapUtils.makeInfoWindow(item) };
      }));

      const bounds = new google.maps.LatLngBounds();
      markerLayers.forEach(layer => {
        layer.forEach(item => {
          bounds.extend(item.marker.getPosition());
          item.marker.setMap(this.map);
          item.marker.addListener('click', () => {
            this.resetAllMapElements();
            this.highlightItem(item);
          });
          item.infoWindow.addListener('closeclick', () => {
            this.resetAllMapElements();
          });
        });
      });
      polylineLayers.forEach(layer => {
        layer.forEach(item => {
          item.polyline.getPath().forEach(position => bounds.extend(position));
          item.polyline.setMap(this.map);
          item.polyline.addListener('click', event => {
            this.resetAllMapElements();
            this.highlightItem(item, event.latLng);
          });
          item.infoWindow.addListener('closeclick', () => {
            this.resetAllMapElements();
          });
        });
      });

      if (nextProps.highlightedItemId) {
        // Flatten 2D arrays to 1D for convenience
        const allItems = [].concat(...markerLayers).concat(...polylineLayers);
        const higlightedItem = allItems.find(item => item.id === nextProps.highlightedItemId);
        if (higlightedItem) {
          this.highlightItem(higlightedItem);
        }
      }

      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      }

      this.setState({ markerLayers, polylineLayers });
    });
  }

  highlightItem(item, position) {
    if (item.marker) {
      utils.highlightMarker(item.marker);
      item.infoWindow.open(this.map, item.marker);
    } else {
      const infoWindowPosition = position || item.polyline.getPath().getArray()[0];
      utils.highlightPolyline(item.polyline)
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
    this.state.markerLayers.forEach(layer => layer.forEach(item => item.infoWindow.close()));
    this.state.polylineLayers.forEach(layer => layer.forEach(item => item.infoWindow.close()));
  }

  resetMarkers() {
    this.state.markerLayers.forEach(layer => layer.forEach(item => utils.unHighlightMarker(item.marker)));
  }

  resetPolylines() {
    this.state.polylineLayers.forEach(layer => layer.forEach(item => utils.unHighlightPolyline(item.polyline)));
  }

  render() {
    return (
      <div className='map' ref='map'></div>
    );
  }
};

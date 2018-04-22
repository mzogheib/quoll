import React from 'react';
import './style.css';
import mapUtils from './utils';
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
  }

  componentWillReceiveProps(nextProps) {
    // Remove existing markers and polylines then replace with new ones
    this.state.markerLayers.forEach(layer => layer.forEach(marker => marker.setMap(null)));
    this.state.polylineLayers.forEach(layer => layer.forEach(polyline => polyline.setMap(null)));

    this.setState({ markerLayers: [], polylineLayers: [] }, () => {
      const markerLayers = nextProps.markerDataLayers.map(layer => layer.map(mapUtils.makeMarker));
      const polylineLayers = nextProps.polylineDataLayers.map(layer => layer.map(mapUtils.makePolyline));

      const bounds = new google.maps.LatLngBounds();
      markerLayers.forEach(layer => {
        layer.forEach(marker => {
          bounds.extend(marker.getPosition());
          marker.setMap(this.map);
        });
      });
      polylineLayers.forEach(layer => {
        layer.forEach(polyline => {
          polyline.getPath().forEach(position => bounds.extend(position));
          polyline.setMap(this.map);
        });
      });

      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      }

      this.setState({ markerLayers: markerLayers, polylineLayers: polylineLayers });
    });
  }

  render() {
    return (
      <div className='map' ref='map'></div>
    );
  }
};

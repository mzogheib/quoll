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
        return { 
          marker: mapUtils.makeMarker(item),
          infoWindow: mapUtils.makeInfoWindow(item)
        };
      }));
      const polylineLayers = nextProps.polylineDataLayers.map(layer => layer.map(item => {
        return {
          polyline: mapUtils.makePolyline(item),
          infoWindow: mapUtils.makeInfoWindow(item)
        };
      }));

      const bounds = new google.maps.LatLngBounds();
      markerLayers.forEach(layer => {
        layer.forEach(item => {
          bounds.extend(item.marker.getPosition());
          item.marker.setMap(this.map);
          item.marker.addListener('click', () => {
            item.infoWindow.open(this.map, item.marker);
          });
        });
      });
      polylineLayers.forEach(layer => {
        layer.forEach(item => {
          item.polyline.getPath().forEach(position => bounds.extend(position));
          item.polyline.setMap(this.map);
          item.polyline.addListener('click', event => {
            item.infoWindow.setPosition(event.latLng);
            item.infoWindow.open(this.map);
          });
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

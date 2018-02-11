import React from 'react';
import './style.css';
const google = window.google;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      layers: []
    };
  }

  componentDidMount() {
    const melbourne = new google.maps.LatLng(-37.8079033, 144.9759344);
    let map = new google.maps.Map(document.getElementById('map'), {
      center: melbourne,
      zoom: 14,
      mapTypeId: 'roadmap',
    });
    this.setState({ map: map });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.layers !== this.props.layers) {
      // Hide existing layers then set to null to delete the layer
      const currentLayers = this.state.layers;
      currentLayers.forEach(layer => {
        layer.forEach(marker => {
          marker.setMap(null);
        });
      });
      this.setState({ layers: [] });

      const newLayers = nextProps.layers.map(layer => {
        return this.makeMarkers(layer);
      });
      this.setState({ layers: newLayers });
    }
  }

  makeMarkers(locations) {
    return locations.map(location => {
      return new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude},
        map: this.state.map,
        title: location.total
      });
    });
  }

  render() {
    return (
      <div className='map' id='map'></div>
    );
  }
};

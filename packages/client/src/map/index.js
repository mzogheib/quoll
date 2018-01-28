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
      // TODO: confirm if setting the layer to null in this way is in 
      // fact deleting it. Are there memory leaks with this approach?
      const currentLayers = this.state.layers;
      currentLayers.forEach(layer => {
        layer.setMap(null);
        layer = null;
      });
      this.setState({ layers: [] });

      const newLayers = nextProps.layers.map(layer => {
        return new google.maps.visualization.HeatmapLayer({
          data: this.makeHeatmapLayerData(layer.data),
          radius: 20,
          opacity: 0.6,
          maxIntensity: 50
        });
      });
      this.setState({ layers: newLayers });
    }
  }

  makeHeatmapLayerData(locations) {
    return locations.map(location => {
      return {
        location: new google.maps.LatLng(location.latitude, location.longitude),
        weight: location.expenses.sum
      };
    })
  }

  render() {
    this.state.layers.forEach(layer => { layer.setMap(this.state.map); });

    return (
      <div className='map' id='map'></div>
    );
  }
};

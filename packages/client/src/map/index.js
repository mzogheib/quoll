import React from 'react';
import './style.css';
const google = window.google;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: []
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
    if (nextProps.layers !== this.props.layers) {
      // Hide existing layers then set to null to delete the layer
      const currentLayers = this.state.layers;
      currentLayers.forEach(layer => {
        layer.forEach(element => {
          element.setMap(null);
        });
      });
      this.setState({ layers: [] }, () => {        
        const newLayers = nextProps.layers;
        const bounds = new google.maps.LatLngBounds();
        newLayers.forEach(layer => {
          layer.forEach(element => {
            element.setMap(this.map);
            if (element.getPosition) {
              // Marker
              bounds.extend(element.getPosition());
            } else {
              // Polyline
              element.getPath().forEach(position => bounds.extend(position));
            }
          });
        });
  
        if (!bounds.isEmpty()) {
          this.map.fitBounds(bounds);
        }
  
        this.setState({ layers: newLayers });
      });
    }
  }

  render() {
    return (
      <div className='map' ref='map'></div>
    );
  }
};

import React from 'react';
import './style.css';
import Api from '../_utils/api';
const google = window.google;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {},
      locations: []
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

    Api.getToshlLocations()
      .then((response) => {
        this.setState({ locations: response });
        console.log(response)
      })
      .catch((response) => {
        console.debug(response);
      });

  }

  render() {
    const heatmapData = this.state.locations.map(location => {
      return {
        location: new google.maps.LatLng(location.latitude, location.longitude),
        weight: location.expenses.sum
      };
    })
    
    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: 20,
      opacity: 0.6,
      maxIntensity: 50
    });
    heatmap.setMap(this.state.map);

    return (
      <div className='map' id='map'>
        hello
      </div>
    );
  }
};

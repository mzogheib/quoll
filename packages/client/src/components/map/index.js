import { connect } from 'react-redux';
import { setFocussedItem } from '../../store/focussed-item';
import Map from './component'

const mapStateToProps = ({ feeds, focussedItemId }) => {
  const markerData = feeds
    .filter(feed => feed.isConnected)
    .filter(feed => feed.isMarker)
    .map(feed => feed.mapData)
    .reduce((prev, next) => prev.concat(next), []);

  const polylineData = feeds
    .filter(feed => feed.isConnected)
    .filter(feed => feed.isPolyline)
    .map(feed => feed.mapData)
    .reduce((prev, next) => prev.concat(next), []);

  return { markerData, polylineData, focussedItemId };
}

const mapDispatchToProps = dispatch => ({
  setFocussedItem: id => dispatch(setFocussedItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
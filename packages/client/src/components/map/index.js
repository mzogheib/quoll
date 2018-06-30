import { connect } from 'react-redux';
import { setFocussedItem } from '../../store/focussed-item';
import Map from './component'

const mapStateToProps = ({ feeds, focussedItemId }) => {
  const connectedFeedsMapDataArrays = feeds.filter(feed => feed.isConnected).map(feed => feed.mapData);
  const connectedFeedsMapData = connectedFeedsMapDataArrays.reduce((prev, next) => prev.concat(next), []);
  
  const markerData = connectedFeedsMapData.filter(md => md.latitude && md.longitude);
  const polylineData = connectedFeedsMapData.filter(md => md.encodedPath);

  return { markerData, polylineData, focussedItemId };
}

const mapDispatchToProps = dispatch => ({
  onElementSelect: id => dispatch(setFocussedItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
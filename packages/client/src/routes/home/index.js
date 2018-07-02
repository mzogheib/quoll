import { connect } from 'react-redux';
import { setDate } from '../../store/date';
import { refreshFeeds } from '../../store/feeds';
import { setFocussedItem } from '../../store/focussed-item';
import Home from './component';

const mapStateToProps = ({ date, feeds, focussedItemId }) => {
  const connectedFeedsMapDataArrays = feeds.filter(feed => feed.isConnected).map(feed => feed.mapData);
  const connectedFeedsMapData = connectedFeedsMapDataArrays.reduce((prev, next) => prev.concat(next), []);
  
  const markerData = connectedFeedsMapData.filter(md => md.latitude && md.longitude);
  const polylineData = connectedFeedsMapData.filter(md => md.encodedPath);
  const isLoading = feeds.reduce((previous, current) => previous || current.isFetching, false);

  return {
    date,
    feeds,
    markerData,
    polylineData,
    focussedItemId,
    isLoading
  };
}

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(refreshFeeds()),
  onDateChange: date => {
    dispatch(setDate(date));
    return dispatch(refreshFeeds())
      .then(() => dispatch(setFocussedItem(null)));
  },
  onEntryClick: id => dispatch(setFocussedItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
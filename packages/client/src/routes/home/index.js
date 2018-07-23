import { connect } from 'react-redux';
import { setDate } from '../../store/date';
import { fetchFeed } from '../../store/feed';
import { setFocussedItem } from '../../store/focussed-item';
import moment from 'moment';
import Home from './component';

const mapStateToProps = ({ date, feed, focussedItemId }) => {
  const markerData = feed.entries.filter(entry => !entry.polyline && entry.locationStart)
    .map(entry => ({
      id: entry.id,
      latitude: entry.locationStart.latitude,
      longitude: entry.locationStart.longitude,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || ''
    }));
  const polylineData = feed.entries.filter(entry => entry.polyline)
    .map(entry => ({
      id: entry.id,
      encodedPath: entry.polyline,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || ''
    }));
  const isLoading = feed.isFetching;

  return {
    date,
    feed,
    markerData,
    polylineData,
    focussedItemId,
    isLoading
  };
}

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(fetchFeed()),
  onDateChange: date => {
    dispatch(setDate(date));
    return dispatch(fetchFeed())
      .then(() => dispatch(setFocussedItem(null)));
  },
  onEntryClick: id => dispatch(setFocussedItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
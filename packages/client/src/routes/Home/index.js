import { connect } from 'react-redux'
import { setDate } from '../../store/date'
import { fetchTimeline } from '../../store/timeline'
import { setFocussedItem } from '../../store/focussed-item'
import moment from 'moment'
import Home from './component'

const mapStateToProps = ({ date, timeline, focussedItem }) => {
  const markerData = timeline.entries
    .filter(entry => !entry.polyline && entry.locationStart)
    .map(entry => ({
      id: entry.id,
      latitude: entry.locationStart.latitude,
      longitude: entry.locationStart.longitude,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || '',
    }))
  const polylineData = timeline.entries
    .filter(entry => entry.polyline)
    .map(entry => ({
      id: entry.id,
      encodedPath: entry.polyline,
      title: entry.title,
      subTitle: moment.unix(entry.timeStart).format('h:mm a'),
      description: entry.description || '',
    }))
  const isLoading = timeline.isFetching

  return {
    date,
    timeline,
    markerData,
    polylineData,
    focussedItem,
    isLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(fetchTimeline()),
  onDateChange: date => {
    dispatch(setDate(date))
    return dispatch(fetchTimeline()).then(() => dispatch(setFocussedItem(null)))
  },
  onEntryClick: (id, latitude, longitude) =>
    dispatch(setFocussedItem(id, latitude, longitude)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

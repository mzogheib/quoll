import { connect } from 'react-redux';
import { setDate } from '../../store/date';
import { refreshFeeds } from '../../store/feeds';
import { setFocussedItem } from '../../store/focussed-item';
import moment from 'moment';
import DatePicker from './component';

const feedsLoading = feeds => feeds.reduce((previous, current) => previous || current.isLoading, false);
const dateIsToday = date => moment(date).isSame(new Date(), 'day');

const mapStateToProps = ({ date, feeds }) => ({
  date,
  nextDisabled: feedsLoading(feeds) || dateIsToday(date),
  prevDisabled: feedsLoading(feeds),
  calendarDisabled: feedsLoading(feeds),
})

const mapDispatchToProps = dispatch => ({
  onDateChange: date => {
    dispatch(setDate(date));
    dispatch(refreshFeeds())
      .then(() => dispatch(setFocussedItem(null)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
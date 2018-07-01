import { connect } from 'react-redux';
import { setDate } from '../../store/date';
import { refreshFeeds } from '../../store/feeds';
import { setFocussedItem } from '../../store/focussed-item';
import Home from './component';

const mapStateToProps = ({ date, feeds }) => ({ 
  date,
  feeds,
  isLoading: feeds.reduce((previous, current) => previous || current.isFetching, false)
 });

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
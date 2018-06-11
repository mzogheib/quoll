import { connect } from 'react-redux';
import { setDate } from '../../store/date';
import { refreshFeeds } from '../../store/feeds';
import { setFocussedItem } from '../../store/focussed-item';
import DatePicker from './component';

const mapStateToProps = state => ({
  date: state.date
})

const mapDispatchToProps = dispatch => ({
  setDate: date => {
    dispatch(setDate(date));
    dispatch(refreshFeeds())
      .then(() => dispatch(setFocussedItem(null)));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
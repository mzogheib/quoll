import { connect } from 'react-redux';
import { setDate, refreshFeeds, setFocussedItem } from '../../actions';
import DatePicker from '../../components/date-picker';

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
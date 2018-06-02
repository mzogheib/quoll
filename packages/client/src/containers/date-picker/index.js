import { connect } from 'react-redux';
import { setDate } from '../../actions';
import DatePickerControls from '../../components/date-picker-controls';

const mapStateToProps = state => ({
  date: state.date
})

const mapDispatchToProps = dispatch => ({
  setDate: date => dispatch(setDate(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePickerControls);
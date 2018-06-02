import { connect } from 'react-redux';
import { setDate } from '../../actions';
import DatePickerControls from '../../components/date-picker-controls';

const mapDispatchToProps = dispatch => ({
  setDate: date => dispatch(setDate(date))
});

export default connect(
  null,
  mapDispatchToProps
)(DatePickerControls);
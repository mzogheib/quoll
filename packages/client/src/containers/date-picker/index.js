import { connect } from 'react-redux';
import { setDate } from '../../actions';
import DatePicker from '../../components/date-picker';

const mapStateToProps = state => ({
  date: state.date
})

const mapDispatchToProps = dispatch => ({
  setDate: date => dispatch(setDate(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);
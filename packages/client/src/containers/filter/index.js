import { connect } from 'react-redux';
import { setDate } from '../../actions';
import FilterControls from '../../components/filter-controls';

const mapDispatchToProps = dispatch => ({
  setDate: date => dispatch(setDate(date))
});

export default connect(
  null,
  mapDispatchToProps
)(FilterControls);
import { connect } from 'react-redux';
import { setFilter } from '../../actions';
import FilterControls from '../../components/filter-controls';

const mapStateToProps = state => ({
  filter: state
});

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterControls);
import { connect } from 'react-redux';
import { setFocussedItem } from '../../actions';
import MenuItem from '../../components/menu-item';

const mapDispatchToProps = dispatch => ({
  setFocussedItem: id => dispatch(setFocussedItem(id))
});

export default connect(
  null,
  mapDispatchToProps
)(MenuItem);
import { connect } from 'react-redux';
import { setFocussedItem } from '../../actions';
import MenuItems from '../../components/menu-items';

const mapStateToProps = ({ feeds }) => ({ feeds });

const mapDispatchToProps = dispatch => ({
    onEntryClick: id => dispatch(setFocussedItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
import { connect } from 'react-redux';
import { setFocussedItem } from '../../store/focussed-item';
import Feed from './component';

const mapStateToProps = ({ feeds }) => ({ feeds });

const mapDispatchToProps = dispatch => ({
    onEntryClick: id => dispatch(setFocussedItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
import { connect } from 'react-redux';
import MenuItems from '../../components/menu-items';

const mapStateToProps = ({ feeds }) => ({ items: feeds });

export default connect(mapStateToProps)(MenuItems);
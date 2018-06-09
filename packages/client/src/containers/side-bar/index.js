import { connect } from 'react-redux';
import SideBar from '../../components/side-bar';

const mapStateToProps = state => ({
  feeds: state.feeds
});

export default connect(mapStateToProps)(SideBar);
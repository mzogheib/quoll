import { connect } from 'react-redux';
import SideBar from '../../components/side-bar';
import { connectFeed, disconnectFeed } from '../../actions';

const mapStateToProps = state => ({
  feeds: state.feeds
});

const mapDispatchToProps = dispatch => ({
  connectFeed: id => dispatch(connectFeed(id)),
  disconnectFeed: id => dispatch(disconnectFeed(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
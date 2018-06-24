import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setConnectedFeeds } from '../store/feeds';
import { loginUser, signupUser } from '../store/user';
import App from './component';
import userService from '../services/user';

const mapStateToProps = ({ feeds }) => ({
    feedsConnected: feeds.reduce((previous, current) => previous || current.isConnected, false)
});

const mapDispatchToProps = dispatch => ({
  // TODO: if login fails then clear that user from localStorage and signup
  onMount: () => {
    const userId = userService.getCurrentUser();
    const action = userId ? () => loginUser(userId) : () => signupUser();
    return dispatch(action()).then(user => {
      const connectedFeeds = user.feeds.filter(feed => feed.isConnected).map(feed => feed.id);
      dispatch(setConnectedFeeds(connectedFeeds));
    });
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

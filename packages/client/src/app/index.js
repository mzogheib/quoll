import { connect } from 'react-redux';
import { setConnectedFeeds, loginUser, signupUser } from '../actions';
import Root from './component';
import userService from '../services/user';

const mapDispatchToProps = dispatch => ({
  // TODO: if login fails then clear that user from localStorage and signup
  authenticate: () => {
    const userId = userService.getCurrentUser();
    const action = userId ? () => loginUser(userId) : () => signupUser();
    return dispatch(action()).then(user => {
      const connectedFeeds = user.feeds.filter(feed => feed.isConnected).map(feed => feed.id);
      dispatch(setConnectedFeeds(connectedFeeds));
    });
  }
});

export default connect(null, mapDispatchToProps)(Root);

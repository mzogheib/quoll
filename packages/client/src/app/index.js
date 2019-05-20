import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setFeedConnected } from '../store/feeds'
import { loginUser, signupUser } from '../store/user'
import App from './component'
import userService from '../services/user'

const mapStateToProps = ({ feeds }) => ({
  feedsConnect: feeds.reduce(
    (previous, current) => previous || current.isConnected,
    false
  ),
})

const mapDispatchToProps = dispatch => ({
  // TODO: if login fails then clear that user from localStorage and signup
  onMount: () => {
    const userId = userService.getCurrentUser()
    const action = userId ? () => loginUser(userId) : () => signupUser()
    return dispatch(action())
      .then(user => user.feeds)
      .then(feeds =>
        feeds.forEach(feed =>
          dispatch(setFeedConnected(feed.name, feed.isConnected))
        )
      )
  },
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)

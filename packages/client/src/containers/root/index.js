import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../../components/app';
import userService from '../../services/user';
import { setConnectedFeeds } from '../../actions';

class Root extends Component {
  constructor(props) {
    super(props);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderRoot = this.renderRoot.bind(this);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    const userId = userService.getCurrentUser();
    const action = userId ? 'login' : 'signup';
    // TODO: if login fails then clear that user from localStorage and signup
    userService[action](userId)
      .then(user => {
        userService.setCurrentUser(user.id);
        this.props.setConnectedFeeds(
          user.feeds.filter(feed => feed.isConnected).map(feed => feed.id)
        )
      })
      .then(() => this.setState({ isLoading: false }));
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  }

  renderRoot() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderRoot();
  }
}

const mapDispatchToProps = dispatch => ({
  setConnectedFeeds: ids => dispatch(setConnectedFeeds(ids))
});

export default connect(null, mapDispatchToProps)(Root);

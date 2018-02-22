import React, { Component } from 'react';
import Utils from '../_utils/'

class FakeOAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const queryParams = Utils.parseQueryParams(window.location.search);
    this.setState({ ...queryParams });
  }

  onAuthorize() {
    window.location.replace(`${this.state.redirect_uri}?state=${this.state.state}&code=1234567890`);
  }

  onCancel() {
    window.location.replace(`${this.state.redirect_uri}?state=${this.state.state}&error=access_denied`);
  }

  render() {
    return (
      <div>
        <div>This is a fake OAuth Page. Authorize this app to connect to your data.</div>
        <button onClick={this.onAuthorize.bind(this)}>Authorize</button>
        <button onClick={this.onCancel.bind(this)}>Cancel</button>
      </div>
    );
  }
}

export default FakeOAuth;

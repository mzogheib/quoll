import React, { Component } from 'react';
import Utils from '../_utils/'

class FakeToshlAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentDidMount() {
    const queryParams = Utils.parseQueryParams(window.location.search);
    this.setState({ ...queryParams });
  }

  onAuthorize(event) {
    window.location.replace(`${this.state.redirect_uri}?state=${this.state.state}&code=${this.state.token}`);
    event.preventDefault();
  }

  onCancel() {
    window.location.replace(`${this.state.redirect_uri}?state=${this.state.state}&error=access_denied`);
  }

  handleTokenChange(event) {
    this.setState({ token: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onAuthorize.bind(this)}>
        <div>This is a fake Toshl Auth Page. Enter your personal token and authorize.</div>
        <input type='text' value={this.state.token} onChange={this.handleTokenChange.bind(this)} required/>
        <input type='submit' disabled={!this.state.token} value='Authorize'/>
        <button onClick={this.onCancel.bind(this)}>Cancel</button>
      </form>
    );
  }
}

export default FakeToshlAuth;

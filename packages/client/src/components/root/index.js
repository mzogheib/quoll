import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.css';
import App from '../../containers/app';
import Header from '../../components/header';
import SideBar from '../../containers/side-bar';
import Settings from '../../containers/settings';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.authenticate().then(() => this.setState({ isLoading: false }));
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  }

  renderRoot() {
    return (
      <BrowserRouter>
        <div className='root'>
          <SideBar />
          <div className='root__right'>
            <Header />
            <div className='root__main'>
              <Switch>
                <Route path="/settings" component={Settings} />
                <Route path="/" component={App} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderRoot();
  }
}

export default Root;

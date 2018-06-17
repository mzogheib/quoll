import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.css';
import Home from '../routes/home';
import Settings from '../routes/settings';
import Header from '../components/header';
import SideBar from '../components/side-bar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.props.onMount().then(() => this.setState({ isLoading: false }));
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  }

  renderApp() {
    return (
      <BrowserRouter>
        <div className='app'>
          <SideBar />
          <div className='app__right'>
            <Header label={this.props.routeTitle} />
            <div className='app__main'>
              <Switch>
                <Route path="/settings" component={Settings} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderApp();
  }
}

export default App;

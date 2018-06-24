import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.css';
import routes from '../routes';
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
            <Header />
            <div className='app__main'>
              <Switch>
                {routes.map((route, index) => <Route key={index} path={route.path} exact={route.exact} component={route.mainComponent} />)}
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

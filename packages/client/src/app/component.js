import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './style.scss'
import routes from '../routes'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import WelcomeModal from './WelcomeModal'

class App extends Component {
  state = {
    isLoading: true,
    showWelcomeModal: false,
  }

  componentDidMount() {
    this.props.onMount().then(() =>
      this.setState({
        isLoading: false,
        showWelcomeModal: !this.props.feedsConnect,
      })
    )
  }

  getRouteTitleFromLocation(location) {
    const route = routes.find(route => route.path === location.pathname)
    return (route && route.title) || ''
  }

  handleWelcomeCancel = () => {
    this.setState({ showWelcomeModal: false })
  }

  handleWelcomeConnect = () => {
    this.setState({ showWelcomeModal: false })
    this.props.history.push('/settings')
  }

  handleSideBarHelpClick = () => {
    this.setState({ showWelcomeModal: true })
  }

  renderLoading = () => <div>Loading...</div>

  renderApp() {
    return (
      <div className="app">
        <SideBar onHelpClick={this.handleSideBarHelpClick} />
        <div className="app__right">
          <Header title={this.getRouteTitleFromLocation(this.props.location)} />
          <div className="app__main">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.mainComponent}
                />
              ))}
            </Switch>
          </div>
        </div>
        <WelcomeModal
          isOpen={this.state.showWelcomeModal}
          onCancel={this.handleWelcomeCancel}
          onConnect={this.handleWelcomeConnect}
        />
      </div>
    )
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderApp()
  }
}

export default App

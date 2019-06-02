import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import routes from '../routes'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import WelcomeModal from './WelcomeModal'

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    height: 100%;
    background-color: ${colors.whiteSmoke};
  `
)

const Content = styled.div`
  flex-grow: 1;
`

const Main = styled.main`
  height: 100%;
`

class App extends Component {
  state = {
    isLoading: true,
    showWelcomeModal: false,
  }

  componentDidMount() {
    this.props.onMount().then(() =>
      this.setState({
        isLoading: false,
        showWelcomeModal: !this.props.areFeedsConnected,
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
      <Wrapper>
        <SideBar onHelpClick={this.handleSideBarHelpClick} />
        <Content>
          <Header>{this.getRouteTitleFromLocation(this.props.location)}</Header>
          <Main>
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
          </Main>
        </Content>
        <WelcomeModal
          isOpen={this.state.showWelcomeModal}
          onCancel={this.handleWelcomeCancel}
          onConnect={this.handleWelcomeConnect}
        />
      </Wrapper>
    )
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderApp()
  }
}

App.propTypes = {
  areFeedsConnected: PropTypes.bool.isRequired,
  onMount: PropTypes.func.isRequired,
}

export default App

import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import routes from '../routes'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import WelcomeModal from './WelcomeModal'

const Wrapper = styled.div(
  ({ theme: { colors, media } }) => css`
    display: flex;
    height: 100%;
    background-color: ${colors.whiteSmoke};

    ${media.breakpointDown(media.md)`
      flex-direction: column-reverse;
    `};
  `
)

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
`

const App = ({ onMount, history, location }) => {
  const [isLoading, setLoading] = useState(true)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  useEffect(() => {
    onMount().then((areFeedsConnected) => {
      setLoading(false)
      setShowWelcomeModal(!areFeedsConnected)
    })
  }, [])

  const getRouteTitleFromLocation = (location) => {
    const route = routes.find((route) => route.path === location.pathname)
    return (route && route.title) || ''
  }

  const handleWelcomeCancel = () => {
    setShowWelcomeModal(false)
  }

  const handleWelcomeConnect = () => {
    setShowWelcomeModal(false)
    history.push('/settings')
  }

  const handleSideBarHelpClick = () => {
    setShowWelcomeModal(true)
  }

  const renderLoading = () => <div>Loading...</div>

  const renderApp = () => {
    return (
      <Wrapper>
        <SideBar onHelpClick={handleSideBarHelpClick} />
        <Content>
          <Header>{getRouteTitleFromLocation(location)}</Header>
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
          isOpen={showWelcomeModal}
          onCancel={handleWelcomeCancel}
          onConnect={handleWelcomeConnect}
        />
      </Wrapper>
    )
  }

  return isLoading ? renderLoading() : renderApp()
}

App.propTypes = {
  onMount: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default App

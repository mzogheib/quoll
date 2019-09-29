import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Button, HorizontalLoader } from '@quoll/ui-components'

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    border-radius: 8px;
  `
)

const Content = styled.div(
  ({ isAuthenticating }) => css`
    display: flex;
    align-items: center;
    padding: ${isAuthenticating
      ? '16px 30px 20px 20px'
      : '20px 30px 20px 20px'};
  `
)

const Logo = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
`

const Info = styled.div`
  flex-grow: 1;
  margin: 0 0 0 10px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})(
  ({ theme: { colors } }) => css`
    align-self: flex-start;
    text-decoration: none;
    font-size: 14px;
    color: ${colors.royalBlue};
  `
)

const FeedSettings = ({ feed, onConnect, onDisconnect }) => {
  const {
    isAuthenticating,
    isConnected,
    imageConnected,
    imageDisconnected,
    name,
    title,
    link,
  } = feed
  const imgSrc = isConnected ? imageConnected : imageDisconnected

  const handleButtonClick = () => {
    if (isAuthenticating) {
      return
    }
    return isConnected ? onDisconnect(name) : onConnect(name)
  }

  return (
    <Wrapper>
      {isAuthenticating && <HorizontalLoader />}
      <Content isAuthenticating={isAuthenticating}>
        <Logo>
          <img src={imgSrc} alt={`${name} logo`} />
        </Logo>
        <Info>
          <Title>{title}</Title>
          <Link href={link.url}>{link.label}</Link>
        </Info>
        <Button.Plain onClick={handleButtonClick} disabled={isAuthenticating}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </Button.Plain>
      </Content>
    </Wrapper>
  )
}

FeedSettings.propTypes = {
  feed: PropTypes.shape({
    isAuthenticating: PropTypes.bool.isRequired,
    isConnected: PropTypes.bool.isRequired,
    imageConnected: PropTypes.string.isRequired,
    imageDisconnected: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onConnect: PropTypes.func.isRequired,
  onDisconnect: PropTypes.func.isRequired,
}

export default FeedSettings

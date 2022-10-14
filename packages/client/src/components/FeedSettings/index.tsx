import styled, { css } from 'styled-components'
import { ButtonPlain, HorizontalLoader } from '@quoll/ui-components'

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    border-radius: 8px;
  `
)

const Content = styled.div<{ isAuthenticating: boolean }>(
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

interface Props {
  feed: {
    isAuthenticating: boolean
    isConnected: boolean
    imageConnected: string
    imageDisconnected: string
    name: string
    title: string
    link: {
      url: string
      label: string
    }
  }
  onConnect: (name: string) => void
  onDisconnect: (name: string) => void
}

const FeedSettings = ({ feed, onConnect, onDisconnect }: Props) => {
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
        <ButtonPlain onClick={handleButtonClick} disabled={isAuthenticating}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </ButtonPlain>
      </Content>
    </Wrapper>
  )
}

export default FeedSettings

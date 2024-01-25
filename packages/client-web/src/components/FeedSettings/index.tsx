import styled, { css } from "styled-components";
import { ButtonPlain, HorizontalLoader } from "@quoll/ui-components";

import { FeedName } from "@modules/feeds/types";
import { FeedState } from "@modules/feeds/model/store";
import FeedLogo from "../FeedLogo";

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    border-radius: 8px;
  `,
);

const Content = styled.div<{ isAuthenticating: boolean }>(
  ({ isAuthenticating }) => css`
    display: flex;
    align-items: center;
    padding: ${isAuthenticating
      ? "16px 30px 20px 20px"
      : "20px 30px 20px 20px"};
  `,
);

const Logo = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
`;

const Info = styled.div`
  flex-grow: 1;
  margin: 0 0 0 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})(
  ({ theme: { colors } }) => css`
    align-self: flex-start;
    text-decoration: none;
    font-size: 14px;
    color: ${colors.royalBlue};
  `,
);

const feedConfig = {
  [FeedName.Toshl]: {
    title: "Toshl",
    link: { url: "https://toshl.com", label: "toshl.com" },
  },
  [FeedName.Strava]: {
    title: "Strava",
    link: { url: "https://www.strava.com", label: "www.strava.com" },
  },
  [FeedName.Uber]: {
    title: "Uber",
    link: { url: "https://www.uber.com", label: "www.uber.com" },
  },
  [FeedName.Moves]: {
    title: "Moves",
    link: { url: "https://www.moves-app.com", label: "www.moves-app.com" },
  },
};

interface Props {
  feed: FeedState;
  onConnect: (name: FeedName) => void;
  onDisconnect: (name: FeedName) => void;
}

const FeedSettings = ({ feed, onConnect, onDisconnect }: Props) => {
  const { isAuthenticating, isConnected, name } = feed;
  const { title, link } = feedConfig[name];

  const handleButtonClick = () => {
    if (isAuthenticating) {
      return;
    }
    return isConnected ? onDisconnect(name) : onConnect(name);
  };

  return (
    <Wrapper>
      {isAuthenticating && <HorizontalLoader />}
      <Content isAuthenticating={isAuthenticating}>
        <Logo>
          <FeedLogo name={name} isGrayscale={!isConnected} />
        </Logo>
        <Info>
          <Title>{title}</Title>
          <Link href={link.url}>{link.label}</Link>
        </Info>
        <ButtonPlain onClick={handleButtonClick} disabled={isAuthenticating}>
          {isConnected ? "Disconnect" : "Connect"}
        </ButtonPlain>
      </Content>
    </Wrapper>
  );
};

export default FeedSettings;

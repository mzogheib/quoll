import { useState } from "react";
import styled, { css } from "styled-components";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import Header from "components/Header";
import SideBar from "components/SideBar";
import routes from "../routes";
import WelcomeModal from "./WelcomeModal";

const Wrapper = styled.div(
  ({ theme: { colors, media } }) => css`
    display: flex;
    height: 100%;
    background-color: ${colors.whiteSmoke};

    ${media.breakpointDown(media.md)`
      flex-direction: column-reverse;
    `};
  `,
);

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const getRouteTitleFromLocation = () => {
    const route = routes.find((route) => route.path === location.pathname);
    return (route && route.title) || "";
  };

  const handleWelcomeClose = () => {
    setShowWelcomeModal(false);
  };

  const handleSideBarHelpClick = () => {
    setShowWelcomeModal(true);
  };

  const handleSignupComplete = () => {
    setShowWelcomeModal(false);
    history.push("/settings");
  };

  const renderApp = () => {
    return (
      <Wrapper>
        <SideBar onHelpClick={handleSideBarHelpClick} />
        <Content>
          <Header>{getRouteTitleFromLocation()}</Header>
          <Main>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </Main>
        </Content>
        <WelcomeModal
          isOpen={showWelcomeModal}
          onCancel={handleWelcomeClose}
          onLoginComplete={handleWelcomeClose}
          onSignupComplete={handleSignupComplete}
        />
      </Wrapper>
    );
  };

  return renderApp();
};

export default App;

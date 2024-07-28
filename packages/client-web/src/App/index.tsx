import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { useAuthViewModel } from "modules/auth/view-model";
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

  const { isAuthenticated, isAuthenticating } = useAuthViewModel();

  const [didCheckAuth, setDidCheckAuth] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const openWelcomeModal = () => {
    setShowWelcomeModal(true);
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  useEffect(() => {
    if (isAuthenticating || isAuthenticated || didCheckAuth) return;

    setDidCheckAuth(true);
    openWelcomeModal();
  }, [didCheckAuth, isAuthenticated, isAuthenticating]);

  const getRouteTitleFromLocation = () => {
    const route = routes.find((route) => route.path === location.pathname);
    return (route && route.title) || "";
  };

  const handleConnectFeeds = () => {
    closeWelcomeModal();
    history.push("/settings");
  };

  return (
    <Wrapper>
      <SideBar onHelpClick={openWelcomeModal} />
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
        onCancel={closeWelcomeModal}
        onConnectFeeds={handleConnectFeeds}
      />
    </Wrapper>
  );
};

export default App;

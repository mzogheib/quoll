import { useState } from "react";
import styled, { css } from "styled-components";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { checkIsFeatureEnabled } from "services/feature-flags";
import { useUserViewModel } from "modules/user/view-model";
import { useAuthUserViewModel } from "modules/auth-user/view-model";
import Header from "components/Header";
import SideBar from "components/SideBar";
import routes from "../routes";
import WelcomeModal from "./WelcomeModal";
import { useBootstrapApp } from "./utils";

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

  const { login, getCurrentUserId } = useUserViewModel();
  const { getMe } = useAuthUserViewModel();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const openWelcomeModal = () => {
    setShowWelcomeModal(true);
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const _login = () => {
    const userId = getCurrentUserId();

    if (userId === undefined) return;

    login(userId);
  };

  const handleAuthenticated = checkIsFeatureEnabled("NEW_AUTH")
    ? getMe
    : _login;

  useBootstrapApp(handleAuthenticated, openWelcomeModal);

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

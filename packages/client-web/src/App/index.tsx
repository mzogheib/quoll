import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { useUserViewModel } from "modules/user/view-model";
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

  const { getCurrentUserId, login } = useUserViewModel();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const userId = getCurrentUserId();

    if (userId === undefined) {
      setShowWelcomeModal(true);
      return;
    }

    login(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRouteTitleFromLocation = () => {
    const route = routes.find((route) => route.path === location.pathname);
    return (route && route.title) || "";
  };

  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const handleSideBarHelpClick = () => {
    setShowWelcomeModal(true);
  };

  const handleSignupComplete = () => {
    closeWelcomeModal();
    history.push("/settings");
  };

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
        onCancel={closeWelcomeModal}
        onLoginComplete={closeWelcomeModal}
        onSignupComplete={handleSignupComplete}
      />
    </Wrapper>
  );
};

export default App;

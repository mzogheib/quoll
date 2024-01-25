import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import userService from "@modules/user/service";
import { selectHasFeedConnected } from "@modules/feeds/model/store";
import { useUserViewModel } from "@modules/user/view-model";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
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

  const hasFeedConnected = useSelector(selectHasFeedConnected);

  const { isAuthenticating, login, signup } = useUserViewModel();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const userId = userService.getCurrentUser();

    if (userId) login(userId);
    else signup();
  }, [login, signup]);

  // TODO: don't show the modal if user is already logged in and disconnects
  // all feeds
  useEffect(() => {
    if (!isAuthenticating && !hasFeedConnected) {
      setShowWelcomeModal(true);
    }
  }, [hasFeedConnected, isAuthenticating]);

  const getRouteTitleFromLocation = () => {
    const route = routes.find((route) => route.path === location.pathname);
    return (route && route.title) || "";
  };

  const handleWelcomeCancel = () => {
    setShowWelcomeModal(false);
  };

  const handleWelcomeConnect = () => {
    setShowWelcomeModal(false);
    history.push("/settings");
  };

  const handleSideBarHelpClick = () => {
    setShowWelcomeModal(true);
  };

  const renderLoading = () => <div>Loading...</div>;

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
          onCancel={handleWelcomeCancel}
          onConnect={handleWelcomeConnect}
        />
      </Wrapper>
    );
  };

  return isAuthenticating ? renderLoading() : renderApp();
};

export default App;

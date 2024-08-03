import { Fragment } from "react";
import { css, createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Modal, themes } from "@quoll/ui-components";
import "typeface-pacifico";

import App from "../App";
import { StoreProvider } from "../store";
import AuthProvider from "./AuthProvider";
import { initFeatureFlags } from "services/feature-flags";

Modal.setAppElement("#root");

const GlobalStyle = createGlobalStyle(
  ({ theme: { font } }) => css`
    html,
    body,
    .rootdiv {
      height: 100%;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: ${font.family};
      color: ${font.color};
    }
    * {
      box-sizing: border-box;
    }
  `,
);

initFeatureFlags();

const AppRoot = () => (
  <AuthProvider>
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider theme={themes.default}>
          <Fragment>
            <App />
            <GlobalStyle />
          </Fragment>
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  </AuthProvider>
);

export default AppRoot;

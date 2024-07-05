import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { HorizontalLoader } from ".";
import { themes } from "../themes";

export default { title: "Horizontal Loader" };

const Wrapper = styled.div`
  width: 200px;
`;

export const Default = () => (
  <ThemeProvider theme={themes.default}>
    <Wrapper>
      <HorizontalLoader />
      <div>Loading...</div>
    </Wrapper>
  </ThemeProvider>
);

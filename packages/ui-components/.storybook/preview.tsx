import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import { themes } from "../src/themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={themes.default}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

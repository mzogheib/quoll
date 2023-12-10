import styled, { css } from "styled-components";
import ReactCalendar from "react-calendar";

export const Calendar = styled(ReactCalendar)(
  ({ theme: { font } }) => css`
    &.react-calendar {
      border: none;
      max-width: 300px;

      * {
        font-family: ${font.family};
      }
    }
  `,
);

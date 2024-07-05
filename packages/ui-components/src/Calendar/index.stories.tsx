import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Calendar } from ".";
import { themes } from "../themes";

export default { title: "Calendar" };

const Wrapper = styled.div`
  width: 200px;
`;

export const Default = () => {
  const today = new Date();
  const [date, setDate] = useState<Date | Date[]>(today);

  return (
    <ThemeProvider theme={themes.default}>
      <Wrapper>
        <Calendar maxDate={today} value={date} onChange={setDate} />
        <code>{date.toLocaleString()}</code>
      </Wrapper>
    </ThemeProvider>
  );
};

import React, { useState } from "react";
import styled from "styled-components";

import { Calendar } from ".";

export default { title: "Calendar" };

const Wrapper = styled.div`
  width: 200px;
`;

export const Default = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [date, setDate] = useState<Date | Date[]>(today);

  return (
    <Wrapper>
      <Calendar maxDate={today} value={date} onChange={setDate} />
      <code>{date.toLocaleString()}</code>
    </Wrapper>
  );
};

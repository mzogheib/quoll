import React, { useState } from "react";
import styled from "styled-components";

import { Input } from ".";

export default { title: "Input" };

const Wrapper = styled.div`
  width: 200px;
`;

export const Default = () => {
  const [value, setValue] = useState("");

  return (
    <Wrapper>
      <Input value={value} onChange={setValue} placeholder="Enter something" />
    </Wrapper>
  );
};

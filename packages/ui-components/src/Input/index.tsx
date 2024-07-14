import React, { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.input(
  ({ theme }) => css`
    font-family: ${theme.font.family};
    font-size: 14px;
    color: ${theme.font.color};
    border: 1px solid ${theme.colors.grey};
    border-radius: 4px;
    padding: 8px;
    width: 100%;
  `,
);

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

type Props = {
  value: string;
  onChange: (value: string) => void;
} & Omit<HTMLInputProps, "value" | "onChange" | "type">;

export const Input = (props: Props) => {
  const { onChange, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <Wrapper onChange={handleChange} type="text" {...rest} />;
};

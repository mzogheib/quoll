import React, { ReactNode } from "react";
import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";

type Props = {
  children: ReactNode;
};

const NavigationContainer = ({ children }: Props) => {
  return <RNNavigationContainer>{children}</RNNavigationContainer>;
};

export default NavigationContainer;

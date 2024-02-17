import React from "react";

import { ScreenProps } from "../config";
import ScreenTemplate from "../ScreenTemplate";

const OAuthScreen = ({ route }: ScreenProps<"oauth">) => {
  return <ScreenTemplate screenName={route.name}>{null}</ScreenTemplate>;
};

export default OAuthScreen;

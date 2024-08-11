import React, { ReactNode } from "react";
import { Auth0Provider } from "react-native-auth0";

import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@env";

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
    throw new Error("Missing Auth0 configuration");
  }

  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;

import { Auth0Provider } from "@auth0/auth0-react";

if (
  !process.env.REACT_APP_AUTH0_DOMAIN ||
  !process.env.REACT_APP_AUTH0_CLIENT_ID
) {
  throw new Error("Auth0 config not found");
}

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN!}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    // These allow the session to be persisted across page refreshes
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    {children}
  </Auth0Provider>
);

export default AuthProvider;

type AuthState = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

type AuthActions = {
  login: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string>;
};

export type AuthModel = AuthState & AuthActions;

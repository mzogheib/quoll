import { useAuthUserViewModel } from "modules/auth-user/view-model";
import { useAuthViewModel } from "modules/auth/view-model";
import { useUserViewModel } from "modules/user/view-model";
import { useEffect, useState } from "react";
import { checkIsFeatureEnabled } from "services/feature-flags";

export const useBootstrapApp = (onUnauthenticated: () => void) => {
  const isNewAuth = checkIsFeatureEnabled("NEW_AUTH");

  // Old auth
  const { login, getCurrentUserId } = useUserViewModel();

  useEffect(() => {
    if (isNewAuth) return;

    const userId = getCurrentUserId();

    if (userId === undefined) {
      onUnauthenticated();
      return;
    }

    login(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New auth
  const { isAuthenticated, isAuthenticating } = useAuthViewModel();
  const { getMe } = useAuthUserViewModel();

  const [didCheckAuth, setDidCheckAuth] = useState(false);

  useEffect(() => {
    if (!isNewAuth) return;

    if (isAuthenticating || didCheckAuth) return;

    setDidCheckAuth(true);

    if (!isAuthenticated) {
      onUnauthenticated();
      return;
    }

    const getOrCreateUser = async () => {
      const me = await getMe();

      if (me === null) {
        // TODO create user
        onUnauthenticated();
        return;
      }
    };

    getOrCreateUser();
  }, [
    didCheckAuth,
    getMe,
    isAuthenticated,
    isAuthenticating,
    isNewAuth,
    onUnauthenticated,
  ]);
};

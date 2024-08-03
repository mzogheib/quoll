import { useAuthModel } from "modules/auth/model";
import { useUserViewModel } from "modules/user/view-model";
import { useEffect, useState } from "react";
import { checkIsFeatureEnabled } from "services/feature-flags";

export const useBootstrapApp = (
  onAuthenticated: () => void,
  onUnauthenticated: () => void,
) => {
  const isNewAuth = checkIsFeatureEnabled("NEW_AUTH");

  // Old auth
  const { getCurrentUserId } = useUserViewModel();

  useEffect(() => {
    if (isNewAuth) return;

    const userId = getCurrentUserId();

    if (userId === undefined) {
      onUnauthenticated();
      return;
    }

    onAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // New auth
  const { isAuthenticated, isAuthenticating } = useAuthModel();

  const [didCheckAuth, setDidCheckAuth] = useState(false);

  useEffect(() => {
    if (!isNewAuth) return;

    if (isAuthenticating || didCheckAuth) return;

    setDidCheckAuth(true);

    if (isAuthenticated) {
      onAuthenticated();
    } else {
      onUnauthenticated();
    }
  }, [
    didCheckAuth,
    isAuthenticated,
    isAuthenticating,
    isNewAuth,
    onAuthenticated,
    onUnauthenticated,
  ]);
};

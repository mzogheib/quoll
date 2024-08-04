import { useAuthUserViewModel } from "modules/auth-user/view-model";
import { useAuthViewModel } from "modules/auth/view-model";
import { useEffect, useState } from "react";

export const useBootstrapApp = (onUnauthenticated: () => void) => {
  const { isAuthenticated, isAuthenticating } = useAuthViewModel();
  const { getMe, createMe } = useAuthUserViewModel();

  const [didCheckAuth, setDidCheckAuth] = useState(false);

  useEffect(() => {
    if (isAuthenticating || didCheckAuth) return;

    setDidCheckAuth(true);

    if (!isAuthenticated) {
      onUnauthenticated();
      return;
    }

    const getOrCreateUser = async () => {
      const me = await getMe();

      if (me === null) {
        await createMe();
        return;
      }
    };

    getOrCreateUser();
  }, [
    createMe,
    didCheckAuth,
    getMe,
    isAuthenticated,
    isAuthenticating,
    onUnauthenticated,
  ]);
};

import { useUserViewModel } from "@modules/user/view-model";
import { useAuthViewModel } from "@modules/auth/view-model";
import { useFeedsViewModel } from "@modules/feeds/view-model";
import { useEffect, useState } from "react";

export const useBootstrapApp = (onUnauthenticated: () => void) => {
  const { isAuthenticated, isAuthenticating } = useAuthViewModel();
  const { getMe, createMe } = useUserViewModel();
  const { setConnected } = useFeedsViewModel();

  const [didCheckAuth, setDidCheckAuth] = useState(false);

  useEffect(() => {
    if (isAuthenticating || didCheckAuth) return;

    setDidCheckAuth(true);

    if (!isAuthenticated) {
      onUnauthenticated();
      return;
    }

    const initUser = async () => {
      const me = await getMe();

      if (me !== null) {
        me.feeds.forEach(({ name, isConnected }) => {
          setConnected(name, isConnected);
        });
        return;
      }

      await createMe();
    };

    initUser();
  }, [
    createMe,
    didCheckAuth,
    getMe,
    isAuthenticated,
    isAuthenticating,
    onUnauthenticated,
  ]);
};

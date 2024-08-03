import { useUserViewModel } from "modules/user/view-model";
import { useEffect } from "react";

export const useBootstrapApp = (onUnauthenticated: () => void) => {
  const { login, getCurrentUserId } = useUserViewModel();

  useEffect(() => {
    const userId = getCurrentUserId();

    if (userId === undefined) {
      onUnauthenticated();
      return;
    }

    login(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

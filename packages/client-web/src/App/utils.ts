import { useUserViewModel } from "modules/user/view-model";
import { useEffect } from "react";

export const useBootstrapApp = (
  onAuthenticated: () => void,
  onUnauthenticated: () => void,
) => {
  const { getCurrentUserId } = useUserViewModel();

  useEffect(() => {
    const userId = getCurrentUserId();

    if (userId === undefined) {
      onUnauthenticated();
      return;
    }

    onAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

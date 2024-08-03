import { useUserViewModel } from "modules/user/view-model";
import { useEffect } from "react";

export const useBootstrapApp = (
  onAuthenticated: (userId: string) => void,
  onUnauthenticated: () => void,
) => {
  const { getCurrentUserId } = useUserViewModel();

  useEffect(() => {
    const userId = getCurrentUserId();

    if (userId === undefined) {
      onUnauthenticated();
      return;
    }

    onAuthenticated(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

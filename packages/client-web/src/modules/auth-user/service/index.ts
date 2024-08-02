import { useMemo } from "react";
import { AuthUserService } from "@quoll/client-lib/modules";

export const useAuthUserService = (getAccessToken: () => Promise<string>) => {
  const service = useMemo(() => {
    if (process.env.REACT_APP_API_URL === undefined) {
      throw new Error("REACT_APP_API_URL is not defined");
    }

    return new AuthUserService(getAccessToken, process.env.REACT_APP_API_URL);
  }, [getAccessToken]);

  return service;
};

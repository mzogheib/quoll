import { useMemo } from "react";
import { AuthUserService } from "@quoll/client-lib";
import { getApiBaseUrl } from "@utils/api";

export const useAuthUserService = (getAccessToken: () => Promise<string>) => {
  const service = useMemo(() => {
    return new AuthUserService(getAccessToken, getApiBaseUrl());
  }, [getAccessToken]);

  return service;
};

import { useMemo } from "react";
import { UserService } from "@quoll/client-lib";
import { getApiBaseUrl } from "services/api";

export const useUserService = (getAccessToken: () => Promise<string>) => {
  const service = useMemo(() => {
    return new UserService(getAccessToken, getApiBaseUrl());
  }, [getAccessToken]);

  return service;
};

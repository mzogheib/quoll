import { FeedsService } from "@quoll/client-lib";
import { useMemo } from "react";
import { getApiBaseUrl } from "services/api";

export const useFeedsService = (getAccessToken: () => Promise<string>) => {
  const feedService = useMemo(() => {
    return new FeedsService(getAccessToken, getApiBaseUrl());
  }, [getAccessToken]);

  return feedService;
};

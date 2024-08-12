import { useMemo } from "react";
import { FeedsService } from "@quoll/client-lib";
import { getApiBaseUrl } from "@utils/api";

export const useFeedsService = (getAccessToken: () => Promise<string>) => {
  const feedService = useMemo(() => {
    return new FeedsService(getAccessToken, getApiBaseUrl());
  }, [getAccessToken]);

  return feedService;
};

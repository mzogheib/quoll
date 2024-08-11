import { TimelineService } from "@quoll/client-lib";
import { getApiBaseUrl } from "@utils/api";
import { useMemo } from "react";

export const useTimelineService = (getAccessToken: () => Promise<string>) => {
  const service = useMemo(() => {
    return new TimelineService(getAccessToken, getApiBaseUrl());
  }, [getAccessToken]);

  return service;
};

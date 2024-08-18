import { TimelineService } from "@quoll/client-lib/modules";
import { useMemo } from "react";
import { getApiBaseUrl } from "services/api";

export const useTimelineService = (getAccessToken: () => Promise<string>) => {
  const feedService = useMemo(() => {
    return new TimelineService(getAccessToken, getApiBaseUrl());
  }, [getAccessToken]);

  return feedService;
};

import { FeedsService } from "@quoll/client-lib";
import { useMemo } from "react";

export const useFeedsService = (getAccessToken: () => Promise<string>) => {
  const feedService = useMemo(() => {
    if (process.env.REACT_APP_API_URL === undefined) {
      throw new Error("REACT_APP_API_URL is not defined");
    }

    return new FeedsService(getAccessToken, process.env.REACT_APP_API_URL);
  }, [getAccessToken]);

  return feedService;
};

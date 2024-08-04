import { getAccessToken } from "services/session";
import { useTimelineModel } from "../model";

export const useTimelineViewModel = () => {
  return useTimelineModel(getAccessToken);
};

import { useTimelineModel } from "../model";
import { useAuthModel } from "modules/auth/model";

export const useTimelineViewModel = () => {
  const { getAccessToken } = useAuthModel();

  return useTimelineModel(getAccessToken);
};

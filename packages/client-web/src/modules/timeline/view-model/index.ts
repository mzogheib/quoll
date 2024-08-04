import { getAccessToken } from "services/session";
import { useTimelineModel } from "../model";
import { useAuthModel } from "modules/auth/model";
import { checkIsFeatureEnabled } from "services/feature-flags";

export const useTimelineViewModel = () => {
  const authModel = useAuthModel();

  const _getAccessToken = checkIsFeatureEnabled("NEW_AUTH")
    ? authModel.getAccessToken
    : getAccessToken;

  return useTimelineModel(_getAccessToken);
};

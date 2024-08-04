import { getAccessToken } from "services/session";
import { useFeedsModel } from "../model";
import { useAuthModel } from "modules/auth/model";
import { checkIsFeatureEnabled } from "services/feature-flags";

export const useFeedsViewModel = () => {
  const authModel = useAuthModel();

  const _getAccessToken = checkIsFeatureEnabled("NEW_AUTH")
    ? authModel.getAccessToken
    : getAccessToken;

  return useFeedsModel(_getAccessToken);
};

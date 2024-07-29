import { AuthModel, useAuthModel } from "../model";
import { useTimelineModel } from "modules/timeline/model";
import { useFeedsModel } from "modules/feeds/model";
import { useDateModel } from "modules/date/model";
import { useAuthUserModel } from "modules/auth-user/model";

type AuthViewModel = AuthModel;

export const useAuthViewModel = (): AuthViewModel => {
  const { getAccessToken } = useAuthModel();

  const authModel = useAuthModel();
  const timelineModel = useTimelineModel();
  const feedsModel = useFeedsModel();
  const dateModel = useDateModel();
  const authUserModel = useAuthUserModel(getAccessToken);

  const _logout = async () => {
    timelineModel.reset();
    feedsModel.reset();
    dateModel.reset();
    authUserModel.reset();

    return await authModel.logout();
  };

  return {
    ...authModel,
    logout: _logout,
  };
};

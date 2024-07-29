import { AuthModel, useAuthModel } from "../model";
import { useTimelineModel } from "modules/timeline/model";
import { useFeedsModel } from "modules/feeds/model";
import { useDateModel } from "modules/date/model";
import { useUserModel } from "modules/user/model";

type AuthViewModel = AuthModel;

export const useAuthViewModel = (): AuthViewModel => {
  const authModel = useAuthModel();
  const timelineModel = useTimelineModel();
  const feedsModel = useFeedsModel();
  const dateModel = useDateModel();
  const userModel = useUserModel();

  const _logout = async () => {
    timelineModel.reset();
    feedsModel.reset();
    dateModel.reset();
    userModel.reset();

    return await authModel.logout();
  };

  return {
    ...authModel,
    logout: _logout,
  };
};

import { AuthModel } from "@quoll/client-lib/modules";
import { useAuthModel } from "../model";
import { useDateModel } from "@modules/date/model";
import { useUserModel } from "@modules/user/model";
import { useTimelineModel } from "@modules/timeline/model";

type AuthViewModel = AuthModel;

export const useAuthViewModel = (): AuthViewModel => {
  const { getAccessToken } = useAuthModel();

  const authModel = useAuthModel();
  const dateModel = useDateModel();
  const timelineModel = useTimelineModel(getAccessToken);
  const userModel = useUserModel(getAccessToken);

  const _logout = async () => {
    dateModel.reset();
    timelineModel.reset();
    userModel.reset();

    return await authModel.logout();
  };

  return {
    ...authModel,
    logout: _logout,
  };
};

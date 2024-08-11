import { AuthModel, useAuthModel } from "../model";
import { useDateModel } from "@modules/date/model";
import { useAuthUserModel } from "@modules/auth-user/model";

type AuthViewModel = AuthModel;

export const useAuthViewModel = (): AuthViewModel => {
  const { getAccessToken } = useAuthModel();

  const authModel = useAuthModel();
  const dateModel = useDateModel();
  const authUserModel = useAuthUserModel(getAccessToken);

  const _logout = async () => {
    dateModel.reset();
    authUserModel.reset();

    return await authModel.logout();
  };

  return {
    ...authModel,
    logout: _logout,
  };
};

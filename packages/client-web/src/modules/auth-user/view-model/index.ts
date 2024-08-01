import { useAuthUserModel } from "../model";
import { useAuthModel } from "modules/auth/model";

export const useAuthUserViewModel = () => {
  const { getAccessToken } = useAuthModel();

  return useAuthUserModel(getAccessToken);
};

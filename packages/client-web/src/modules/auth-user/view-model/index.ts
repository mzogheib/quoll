import { useUserModel } from "../model";
import { useAuthModel } from "modules/auth/model";

export const useUserViewModel = () => {
  const { getAccessToken } = useAuthModel();

  return useUserModel(getAccessToken);
};

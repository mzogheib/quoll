import { useFeedsModel } from "../model";
import { useAuthModel } from "modules/auth/model";

export const useFeedsViewModel = () => {
  const { getAccessToken } = useAuthModel();

  return useFeedsModel(getAccessToken);
};

import { useAuthModel } from "@modules/auth/model";
import { useFeedsModel } from "../model";

export const useFeedsViewModel = () => {
  const { getAccessToken } = useAuthModel();

  return useFeedsModel(getAccessToken);
};

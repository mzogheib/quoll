import { getAccessToken } from "services/session";
import { useFeedsModel } from "../model";

export const useFeedsViewModel = () => {
  return useFeedsModel(getAccessToken);
};

import { storage as userStorage } from "@modules/user/model";

// A hacky solution for now
export const getAccessToken = async () => {
  const userId = userStorage.getData()?.id;

  if (!userId) throw new Error("Unauthenticated");

  return userId;
};

import moment from "moment";

import { toshlAuthApi } from "./oauth-api";
import { toshlApi } from "./api";
import { ToshlUserModel } from "../../models/toshlUser.model";

const getOAuthUrl = () => {
  return toshlAuthApi.url();
};

const transformAuthResponse = ({
  expires_in,
  access_token,
  refresh_token,
}: {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}) => ({
  expiry_time: calculateExpiryTime(expires_in),
  access_token,
  refresh_token,
});

const authenticate = async (code: string) => {
  const result = await toshlAuthApi.token({ code });
  return transformAuthResponse(result);
};

const deauthorize = async ({
  refresh_token,
  access_token,
}: {
  refresh_token: string;
  access_token: string;
}) => {
  await toshlAuthApi.deauthorize({ refresh_token, access_token });
  await ToshlUserModel.deleteOne({ accessToken: access_token });
};

const refreshAuth = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  const data = await toshlAuthApi.refresh({ refresh_token });
  // Clear cache identified by old access_token
  await ToshlUserModel.deleteOne({ accessToken: access_token });
  return transformAuthResponse(data);
};

const getTags = async (accessToken: string) => {
  const toshlUser = await ToshlUserModel.findOne({ accessToken });

  if (toshlUser?.tags) return toshlUser.tags;

  const tags = await toshlApi.tagsList({ accessToken });

  const newToshlUser = await ToshlUserModel.create({
    accessToken,
    tags: tags.reduce((prev, tag) => ({ [tag.id]: tag.name, ...prev }), {}),
  });

  return newToshlUser.tags;
};

const getEntries = async (from: string, to: string, accessToken: string) => {
  // Toshl dates are in the user's timezone so convert the ISO string
  // to local (default moment output for an ISO string input) and format
  const fromDate = moment(from).format("YYYY-MM-DD");
  const toDate = moment(to).format("YYYY-MM-DD");

  const entries = await toshlApi.entriesList({
    from: fromDate,
    to: toDate,
    accessToken,
  });

  const tags = await getTags(accessToken);

  return entries.map((entry) => {
    return {
      ...entry,
      tags: entry.tags.map((id) => ({ id, name: tags[id] || "No tag" })),
    };
  });
};

const calculateExpiryTime = (expiresIn: number) => {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
};

export const service = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getData: getEntries,
};

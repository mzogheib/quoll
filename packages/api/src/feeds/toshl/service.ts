import moment from "moment";
import {
  ToshlResolvedEntry,
  ToshlApi,
  ToshlAuthApi,
} from "@quoll/lib/feeds/toshl";
import { toshlEntriesAdapter } from "@quoll/lib/modules";

import { ToshlUserModel } from "../../models/toshlUser.model";
import { getEnvVariable } from "../../utils/env";

const toshlApi = new ToshlApi({ baseUrl: "https://api.toshl.com" });
const toshlAuthApi = new ToshlAuthApi({
  baseUrl: "https://toshl.com/oauth/v2",
  redirect_uri: getEnvVariable("CLIENT_OAUTH_URL"),
  client_id: getEnvVariable("TOSHL_CLIENT_ID"),
  client_secret: getEnvVariable("TOSHL_CLIENT_SECRET"),
});

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
  const result = {
    expires_in: 9999999999,
    access_token: code,
    refresh_token: "",
  };
  return transformAuthResponse(result);
};

const deauthorize = async ({
  access_token,
}: {
  refresh_token: string;
  access_token: string;
}) => {
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

const getEntries = async (
  from: string,
  to: string,
  accessToken: string,
): Promise<ToshlResolvedEntry[]> => {
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

const getTimeline = async (from: string, to: string, accessToken: string) => {
  const entries = await getEntries(from, to, accessToken);
  return toshlEntriesAdapter(entries);
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
  getTimeline,
};

import { checkIsFeatureEnabled } from "services/feature-flags";

export const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL === undefined) {
    throw new Error("REACT_APP_API_URL is not defined");
  }

  const version = checkIsFeatureEnabled("NEW_AUTH") ? "/v2" : "";
  const baseUrl = `${process.env.REACT_APP_API_URL}${version}`;

  return baseUrl;
};

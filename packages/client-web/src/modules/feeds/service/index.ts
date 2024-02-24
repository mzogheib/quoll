import { FeedsService } from "@quoll/client-lib";

import { getAccessToken } from "services/session";

const feedsService = new FeedsService(
  getAccessToken,
  `${process.env.REACT_APP_API_URL}`,
);

export default feedsService;

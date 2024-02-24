import { TimelineService } from "@quoll/client-lib";

import { getAccessToken } from "services/session";

const timelineService = new TimelineService(
  getAccessToken,
  `${process.env.REACT_APP_API_URL}`,
);

export default timelineService;

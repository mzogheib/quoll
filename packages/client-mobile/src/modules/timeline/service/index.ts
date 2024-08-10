import { TimelineService } from "@quoll/client-lib";
import { getAccessToken } from "@utils/session";
import { getApiBaseUrl } from "@utils/api";

const timelineService = new TimelineService(getAccessToken, getApiBaseUrl());

export default timelineService;

import { TimelineService } from "@quoll/client-lib/modules";
import { getAccessToken } from "@utils/session";
import { API_URL } from "@env";

const timelineService = new TimelineService(getAccessToken, API_URL);

export default timelineService;

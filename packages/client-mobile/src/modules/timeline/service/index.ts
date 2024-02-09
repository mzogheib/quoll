import { ISO8601Date, TimelineService } from "@quoll/client-lib";

const get = async (date: ISO8601Date) => {
  console.log("getting timeline for", date);

  return [];
};

const timelineService: TimelineService = {
  get,
};

export default timelineService;

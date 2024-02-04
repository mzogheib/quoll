import { TimelineService } from "@quoll/client-lib";

const get = async (date: string) => {
  console.log("getting timeline for", date);

  return [];
};

const timelineService: TimelineService = {
  get,
};

export default timelineService;

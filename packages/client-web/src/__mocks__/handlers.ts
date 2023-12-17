import { http, HttpResponse } from "msw";

import userData from "./data/user.json";
import timelineData from "./data/timeline.json";

const makeApiUrl = (endpoint: string) =>
  `${process.env.REACT_APP_API_URL}${endpoint}`;

export const handlers = [
  http.post(makeApiUrl("/signup"), () => {
    return HttpResponse.json(userData);
  }),
  http.post(makeApiUrl("/login"), () => {
    return HttpResponse.json(userData);
  }),
  http.get(makeApiUrl("/timeline"), () => {
    return HttpResponse.json(timelineData);
  }),
];

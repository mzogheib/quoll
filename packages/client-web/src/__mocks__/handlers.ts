import { http, HttpResponse } from "msw";

import userData from "./data/user.json";
import timelineData from "./data/timeline.json";

export const handlers = [
  http.post("http://localhost:3001/api/signup", () => {
    return HttpResponse.json(userData);
  }),
  http.post("http://localhost:3001/api/login", () => {
    return HttpResponse.json(userData);
  }),
  http.get("http://localhost:3001/api/timeline", () => {
    return HttpResponse.json(timelineData);
  }),
];

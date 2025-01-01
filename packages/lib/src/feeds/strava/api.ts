import { HttpService } from "../../services";
import { Activity, AthleteActivity } from "./types";

type Params = {
  baseUrl: string;
};

export class StravaApi extends HttpService {
  constructor({ baseUrl }: Params) {
    super(baseUrl);
  }

  private makeAuthHeader(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async activitiesGet(params: { id: number; accessToken: string }) {
    const { id, accessToken } = params;

    return await super.request<Activity>({
      method: "GET",
      endpoint: `/activities/${id}`,
      headers: this.makeAuthHeader(accessToken),
    });
  }

  async atheleteActivitiesList(params: {
    after: number;
    before: number;
    per_page: number;
    accessToken: string;
  }) {
    const { after, before, per_page, accessToken } = params;

    return await super.request<AthleteActivity[]>({
      method: "GET",
      endpoint: "/athlete/activities",
      headers: this.makeAuthHeader(accessToken),
      params: {
        after: String(after),
        before: String(before),
        per_page: String(per_page),
      },
    });
  }
}

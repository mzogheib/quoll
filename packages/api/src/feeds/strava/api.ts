import { HttpService } from "@quoll/lib/services";

type Activity = {
  id: number;
};

type AthleteActivity = {
  id: number;
};

export class StravaApi extends HttpService {
  constructor() {
    super("https://www.strava.com/api/v3");
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

export const stravaApi = new StravaApi();

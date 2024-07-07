declare module "node-strava" {
  export default class NodeStrava {
    constructor(config: {
      redirect_uri: string;
      client_id: string;
      client_secret: string;
    });

    oauth: {
      url(): string;
      token(params: { code: string }): Promise<{
        expires_in: number;
        access_token: string;
        refresh_token: string;
      }>;
      refresh(params: { refresh_token: string }): Promise<{
        expires_in: number;
        access_token: string;
        refresh_token: string;
      }>;
      deauthorize(params: {
        access_token: string;
      }): Promise<{ access_token: string }>;
    };

    athlete: {
      activities: {
        list(params: {
          after: number;
          before: number;
          per_page: number;
          access_token: string;
        }): Promise<{ id: number }[]>;
      };
    };

    activities: {
      get(params: {
        id: number;
        access_token: string;
      }): Promise<{ id: number }[]>;
    };
  }
}

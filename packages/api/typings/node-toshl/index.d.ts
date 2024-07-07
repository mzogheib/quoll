declare module "node-toshl" {
  export default class NodeToshl {
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

    tags: {
      list(params: {
        access_token: string;
      }): Promise<{ id: string; name: string }[]>;
    };

    entries: {
      list(params: {
        from: string;
        to: string;
        access_token: string;
      }): Promise<{ id: string }[]>;
    };
  }
}

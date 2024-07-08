declare module "node-toshl" {
  export type AuthData = {
    expires_in: number;
    access_token: string;
    refresh_token: string;
  };

  export type Entry = {
    id: string;
    tags: string[];
  };

  export type Tag = {
    id: string;
    name: string;
  };

  export default class NodeToshl {
    constructor(config: {
      redirect_uri: string;
      client_id: string;
      client_secret: string;
    });

    oauth: {
      url(): string;
      token(params: { code: string }): Promise<AuthData>;
      refresh(params: { refresh_token: string }): Promise<AuthData>;
      deauthorize(params: {
        access_token: string;
      }): Promise<{ access_token: string }>;
    };

    tags: {
      list(params: { access_token: string }): Promise<Tag[]>;
    };

    entries: {
      list(params: {
        from: string;
        to: string;
        access_token: string;
      }): Promise<Entry[]>;
    };
  }
}

declare module "node-strava" {
  export default class NodeStrava {
    constructor(config: {
      redirect_uri: string;
      client_id: string;
      client_secret: string;
    }) {}
  }
}

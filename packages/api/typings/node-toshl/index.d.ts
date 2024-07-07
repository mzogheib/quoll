declare module "node-toshl" {
  export default class NodeToshl {
    constructor(config: {
      redirect_uri: string;
      client_id: string;
      client_secret: string;
    }) {}
  }
}

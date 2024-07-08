import NodeToshl from "node-toshl";

if (!process.env.CLIENT_OAUTH_URL) {
  throw new Error("Client OAuth URL not found");
}

if (!process.env.TOSHL_CLIENT_ID || !process.env.TOSHL_CLIENT_SECRET) {
  throw new Error("Toshl credentials not found");
}

export const toshlApi = new NodeToshl({
  redirect_uri: process.env.CLIENT_OAUTH_URL,
  client_id: process.env.TOSHL_CLIENT_ID,
  client_secret: process.env.TOSHL_CLIENT_SECRET,
});

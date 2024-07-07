const NodeStrava = require("node-strava");
const NodeToshl = require("node-toshl");

if (!process.env.CLIENT_OAUTH_URL) {
  throw new Error("Client OAuth URL not found");
}

if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
  throw new Error("Strava credentials not found");
}

export const strava = new NodeStrava({
  redirect_uri: process.env.CLIENT_OAUTH_URL,
  client_id: process.env.STRAVA_CLIENT_ID,
  client_secret: process.env.STRAVA_CLIENT_SECRET,
});

if (!process.env.TOSHL_CLIENT_ID || !process.env.TOSHL_CLIENT_SECRET) {
  throw new Error("Toshl credentials not found");
}

export const toshl = new NodeToshl({
  redirect_uri: process.env.CLIENT_OAUTH_URL,
  client_id: process.env.TOSHL_CLIENT_ID,
  client_secret: process.env.TOSHL_CLIENT_SECRET,
});

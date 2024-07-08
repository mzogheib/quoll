import moment from "moment";
import { NextFunction, Response } from "express";

import * as feedServices from "../feed-services";
import { setFeedAuth, get, getFeedAuth } from "../controllers/users.controller";
import { AuthenticatedRequest } from "./types";

const supportedFeeds = ["toshl", "strava"] as const;
type SupportedFeed = (typeof supportedFeeds)[number];

const isSupportedFeed = (feed: string): feed is SupportedFeed =>
  supportedFeeds.includes(feed as SupportedFeed);

export const getOAuthUrl = (req: AuthenticatedRequest, res: Response) => {
  const { feed } = req.query;

  if (feed === undefined || typeof feed !== "string") {
    res.status(400).json("No feed provided.");
    return;
  }

  if (!isSupportedFeed(feed)) {
    res.status(404).json(`Unknown feed: ${feed}`);
    return;
  }

  const url = feedServices[feed].getOAuthUrl();

  res.status(200).json(url);
};

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { feed } = req.query;
  const { code } = req.body;
  const { userId } = req;

  if (feed === undefined || typeof feed !== "string") {
    res.status(400).json("No feed provided.");
    return;
  }

  if (!isSupportedFeed(feed)) {
    res.status(404).json(`Unknown feed: ${feed}`);
    return;
  }

  if (!code) {
    res.status(400).json("No authorization code provided.");
    return;
  }

  const data = await feedServices[feed].authenticate(code);
  await setFeedAuth(userId, feed, data);

  res.status(240).end();
};

// TODO this shouldn't be done here. Do it in the feed service or somewhere
// closer to the feed
export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;

  const user = await get(userId);

  const promises = user.feeds
    .filter((feed) => feed.auth)
    .map(async (feed) => {
      if (!feed.auth!.expiry_time) {
        return Promise.resolve();
      }

      if (moment().unix() < feed.auth!.expiry_time) {
        return Promise.resolve();
      }

      if (!isSupportedFeed(feed.name)) {
        return Promise.reject(
          res.status(404).json(`Unkown feed: ${feed.name}`),
        );
      }

      const newAuth = await feedServices[feed.name].refreshAuth(feed.auth!);
      await setFeedAuth(userId, feed.name, newAuth);

      return Promise.resolve();
    });

  return Promise.all(promises).then(() => next());
};

export const deauthorize = async (req: AuthenticatedRequest, res: Response) => {
  const { feed } = req.query;
  const { userId } = req;

  if (feed === undefined || typeof feed !== "string") {
    res.status(400).json("No feed provided.");
    return;
  }

  if (!isSupportedFeed(feed)) {
    res.status(404).json(`Unknown feed: ${feed}`);
    return;
  }

  const authData = await getFeedAuth(userId, feed);

  if (!authData) {
    res.status(404).json("No feed auth data found.");
    return;
  }

  await feedServices[feed].deauthorize(authData);
  await setFeedAuth(userId, feed, null);

  res.status(204).end();

  return;
};

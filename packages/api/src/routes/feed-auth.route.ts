import moment from "moment";
import { NextFunction, Response } from "express";

import * as feedServices from "../feed-services";
import { setFeedAuth, get, getFeedAuth } from "../controllers/users.controller";
import { AuthenticatedRequest } from "./types";

export const getOAuthUrl = (req: AuthenticatedRequest, res: Response) => {
  const { feed } = req.query;

  if (feed === undefined || typeof feed !== "string") {
    res.status(400).json("No feed provided.");
    return;
  }

  if (feed === "toshl") {
    const url = feedServices.toshl.getOAuthUrl();
    res.status(200).json(url);
    return;
  }

  if (feed === "strava") {
    const url = feedServices.strava.getOAuthUrl();
    res.status(200).json(url);
    return;
  }

  res.status(404).json(`Unknown feed: ${feed}`);
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

  if (!code) {
    res.status(400).json("No authorization code provided.");
    return;
  }

  if (feed === "toshl") {
    const data = await feedServices.toshl.authenticate(code);
    await setFeedAuth(userId, feed, data);
    res.status(240).end();
    return;
  }

  if (feed === "strava") {
    const data = await feedServices.strava.authenticate(code);
    await setFeedAuth(userId, feed, data);
    res.status(204).end();
    return;
  }

  res.status(404).json(`Unknown feed: ${feed}`);
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

      if (feed.name === "toshl") {
        const newAuth = await feedServices.toshl.refreshAuth(feed.auth!);
        await setFeedAuth(userId, feed.name, newAuth);
        return Promise.resolve();
      }

      if (feed.name === "strava") {
        const newAuth = await feedServices.strava.refreshAuth(feed.auth!);
        console.log(newAuth);
        await setFeedAuth(userId, feed.name, newAuth);
        return Promise.resolve();
      }

      return Promise.reject(res.status(404).json(`Unkown feed: ${feed.name}`));
    });

  return Promise.all(promises).then(() => next());
};

export const deauthorize = async (req: AuthenticatedRequest, res: Response) => {
  const { feed } = req.query;
  const { userId } = req;

  if (!feed) {
    res.status(400).json("No feed provided.");
    return;
  }

  if (feed === "toshl") {
    const authData = await getFeedAuth(userId, feed);

    if (!authData) {
      res.status(404).json("No feed auth data found.");
      return;
    }

    await feedServices.toshl.deauthorize(authData);
    await setFeedAuth(userId, feed, null);

    res.status(204).end();

    return;
  }

  if (feed === "strava") {
    const authData = await getFeedAuth(userId, feed);

    if (!authData) {
      res.status(404).json("No feed auth data found.");
      return;
    }

    await feedServices.strava.deauthorize(authData);
    await setFeedAuth(userId, feed, null);

    res.status(204).end();

    return;
  }

  res.status(404).json(`Unknown feed: ${feed}`);
};

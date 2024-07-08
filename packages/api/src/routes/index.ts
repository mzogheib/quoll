import { Router } from "express";

import { login, signup, authenticate } from "./users.route";
import {
  checkAuth as checkFeedAuth,
  getOAuthUrl,
  authenticate as authenticateFeed,
  deauthorize,
} from "./feed-auth.route";
import { get } from "./timeline.route";
import { AuthenticatedRequest } from "./types";

const router = Router();

router.route("/login").post(login);

router.route("/signup").post(signup);

router
  .route("/feed-auth")
  .all(authenticate)
  // TODO can this be removed? Do any of these endpoints need an authenticated feed?
  .all((req, res, next) =>
    checkFeedAuth(req as AuthenticatedRequest, res, next),
  )
  .get((req, res) => getOAuthUrl(req as AuthenticatedRequest, res))
  .post((req, res) => authenticateFeed(req as AuthenticatedRequest, res))
  .delete(deauthorize);

router
  .route("/timeline")
  .all(authenticate)
  .all((req, res, next) =>
    checkFeedAuth(req as AuthenticatedRequest, res, next),
  )
  .get((req, res) => get(req as AuthenticatedRequest, res));

export default router;

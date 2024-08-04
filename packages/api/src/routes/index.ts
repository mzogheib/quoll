import { Router } from "express";

import { login, signup, authenticate } from "./users.route";
import {
  checkAuth as checkFeedAuth,
  connect,
  authenticate as authenticateFeed,
  deauthorize,
} from "./feed-auth.route";
import { get } from "./timeline.route";
import { AuthenticatedRequest } from "./types";
import { authMiddleware } from "./auth";
import { addUserIdMiddleware, createMeRoute, getMeRoute } from "./user.route";

const router = Router();

// v1 - legacy auth
router.route("/login").post(login);
router.route("/signup").post(signup);

router
  .route("/feed-auth")
  .all(authenticate)
  .get((req, res) => connect(req as AuthenticatedRequest, res))
  .post((req, res) => authenticateFeed(req as AuthenticatedRequest, res))
  // Only the deauthorize endpoint requires the feed to be authenticated
  .all((req, res, next) =>
    checkFeedAuth(req as AuthenticatedRequest, res, next),
  )
  .delete((req, res) => deauthorize(req as AuthenticatedRequest, res));

router
  .route("/timeline")
  .all(authenticate)
  .all((req, res, next) =>
    checkFeedAuth(req as AuthenticatedRequest, res, next),
  )
  .get((req, res) => get(req as AuthenticatedRequest, res));

// v2 - new auth
router
  .route("/user/me")
  .all(authMiddleware)
  .get(getMeRoute)
  .post(createMeRoute);

router
  .route("/v2/feed-auth")
  .all(authMiddleware)
  .all(addUserIdMiddleware)
  .get((req, res) => connect(req as AuthenticatedRequest, res))
  .post((req, res) => authenticateFeed(req as AuthenticatedRequest, res))
  // Only the deauthorize endpoint requires the feed to be authenticated
  .all((req, res, next) =>
    checkFeedAuth(req as AuthenticatedRequest, res, next),
  )
  .delete((req, res) => deauthorize(req as AuthenticatedRequest, res));

router
  .route("/v2/timeline")
  .all(authMiddleware)
  .all(addUserIdMiddleware)
  .all((req, res, next) =>
    checkFeedAuth(req as AuthenticatedRequest, res, next),
  )
  .get((req, res) => get(req as AuthenticatedRequest, res));

export default router;

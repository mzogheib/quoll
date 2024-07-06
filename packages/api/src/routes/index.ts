import { Router } from "express";

import { login, signup, authenticate } from "./users.route";
import {
  checkAuth,
  getOAuthUrl,
  authenticate as _authenticate,
  deauthorize,
} from "./feed-auth.route";
import { get } from "./timeline.route";

const router = Router();

router.route("/login").post(login);

router.route("/signup").post(signup);

router
  .route("/feed-auth")
  .all(authenticate)
  .all(checkAuth)
  .get(getOAuthUrl)
  .post(_authenticate)
  .delete(deauthorize);

router.route("/timeline").all(authenticate).all(checkAuth).get(get);

export default router;

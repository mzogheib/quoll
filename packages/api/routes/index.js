const express = require("express");
const router = express.Router();

const routeUsers = require("./users.route");
const routeFeedAuth = require("./feed-auth.route");
const routeTimeline = require("./timeline.route");

module.exports = router;

router.route("/login").post(routeUsers.login);

router.route("/signup").post(routeUsers.signup);

router
  .route("/feed-auth")
  .all(routeUsers.authenticate)
  .all(routeFeedAuth.checkAuth)
  .get(routeFeedAuth.getOAuthUrl)
  .post(routeFeedAuth.authenticate)
  .delete(routeFeedAuth.deauthorize);

router
  .route("/timeline")
  .all(routeUsers.authenticate)
  .all(routeFeedAuth.checkAuth)
  .get(routeTimeline.get);

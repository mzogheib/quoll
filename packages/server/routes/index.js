const express = require('express');
const router = express.Router();

const routeToshl = require('./toshl.route');
const routeStrava = require('./strava.route');
const routeMoves = require('./moves.route');
const routeUsers = require('./users.route');
const routeFeedAuth = require('./feed-auth.route');

module.exports = router;

router
  .route('/login')
  .post(routeUsers.login);

router
  .route('/signup')
  .post(routeUsers.signup);

router
  .route('/feed-auth')
  .all(routeUsers.authenticate)
  .get(routeFeedAuth.getOAuthUrl)
  .post(routeFeedAuth.authenticate)
  .delete(routeFeedAuth.deauthorize);

router
  .route('/toshl')
  .all(routeUsers.authenticate)
  .all(routeToshl.checkAuth)
  .get(routeToshl.listEntries);

router
  .route('/strava')
  .all(routeUsers.authenticate)
  .get(routeStrava.listActivities)

router
  .route('/moves')
  .all(routeUsers.authenticate)
  .all(routeMoves.checkAuth)
  .get(routeMoves.getSegments);

const express = require('express');
const router = express.Router();

const routeToshl = require('./toshl.route');
const routeStrava = require('./strava.route');
const routeMoves = require('./moves.route');
const routeUsers = require('./users.route');

module.exports = router;

router
  .route('/login')
  .post(routeUsers.login);

router
  .route('/signup')
  .post(routeUsers.signup);

router
  .route('/toshl')
  .all(routeUsers.authenticate)
  .all(routeToshl.checkAuth)
  .get(routeToshl.listEntries);

router
  .route('/toshl-auth')
  .all(routeUsers.authenticate)
  .get(routeToshl.getOAuthUrl)
  .post(routeToshl.authenticate);

router
  .route('/toshl-deauth')
  .all(routeUsers.authenticate)
  .post(routeToshl.deauthorize);

router
  .route('/strava')
  .all(routeUsers.authenticate)
  .get(routeStrava.listActivities)

router
  .route('/strava-auth')
  .all(routeUsers.authenticate)
  .get(routeStrava.getOAuthUrl)
  .post(routeStrava.authenticate);

router
  .route('/strava-deauth')
  .all(routeUsers.authenticate)
  .post(routeStrava.deauthorize);

router
  .route('/moves')
  .all(routeUsers.authenticate)
  .all(routeMoves.checkAuth)
  .get(routeMoves.getStoryline);

router
  .route('/moves-auth')
  .all(routeUsers.authenticate)
  .get(routeMoves.getOAuthUrl)
  .post(routeMoves.authenticate);

router
  .route('/moves-deauth')
  .all(routeUsers.authenticate)
  .post(routeMoves.deauthorize);

const express = require('express');
const router = express.Router();

const routeToshl = require('./toshl.route');
const routeStrava = require('./strava.route');
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
  .get(routeToshl.listEntries);

router
  .route('/toshl-auth')
  .post(routeToshl.authenticate);

router
  .route('/toshl-deauth')
  .post(routeToshl.deauthorize);

  router
  .route('/strava')
  .get(routeStrava.listActivities)

router
  .route('/strava-auth')
  .post(routeStrava.authenticate);

router
  .route('/strava-deauth')
  .post(routeStrava.deauthorize);
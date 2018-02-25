const express = require('express');
const router = express.Router();

const routeToshl = require('./toshl.route');
const routeStrava = require('./strava.route');

module.exports = router;

router
  .route('/toshl')
  .get(routeToshl.listEntries);

  router
  .route('/strava')
  .get(routeStrava.listActivities)

router
  .route('/strava-auth')
  .post(routeStrava.authenticate);

router
  .route('/strava-deauth')
  .post(routeStrava.deauthorize);
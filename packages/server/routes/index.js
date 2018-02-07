const express = require('express');
const router = express.Router();

const routeToshl = require('./toshl.route');
const routeStrave = require('./strava.route');

module.exports = router;

router
  .route('/toshl')
  .get(routeToshl.listEntries);

router
  .route('/strava')
  .get(routeStrave.listActivities)
  .post(routeStrave.authenticate);
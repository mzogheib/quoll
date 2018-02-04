const express = require('express');
const router = express.Router();

const routeToshl = require('./toshl.route.js');

module.exports = router;

router
  .route('/toshl')
  .get(routeToshl.listEntries)

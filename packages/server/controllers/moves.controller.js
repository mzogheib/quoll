const apiMoves = require('../vendor-apis/moves');

module.exports = {
  getOAuthUrl,
  authenticate,
  refreshAuth,
  getSegments
};

const SegmentWhitelist = ['move', 'place'];

function getOAuthUrl() {
  return apiMoves.oauth.url();
}

function authenticate(code) {
  return apiMoves.oauth.token(code);
}

function refreshAuth(auth) {
  return apiMoves.oauth.refresh(auth)
    .then(newAuth => newAuth);
}

function getSegments (from, to, token) {
  const trackPoints = true;
  return apiMoves.storyline(from, to, trackPoints, token)
    // Flatten segments to a 1D array
    .then(storyline => storyline.reduce((prev, next) => prev.concat([].concat(...next.segments)), []));
}
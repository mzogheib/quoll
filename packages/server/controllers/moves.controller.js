const apiMoves = require('../vendor-apis/moves');

module.exports = {
  getOAuthUrl,
  authenticate,
  refreshAuth,
  getStoryline
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

function getStoryline (from, to, token) {
  const trackPoints = true;
  return apiMoves.storyline(from, to, trackPoints, token)
    .then(storyline => {
      return storyline.reduce((prev, next) =>
        prev.concat(
          // Flatten activities to a 1D array
          [].concat(
            ...next.segments
              .filter(segment => SegmentWhitelist.includes(segment.type))
              .map(segment => segment.activities)
          )
        ),
        []
      );
    });
}
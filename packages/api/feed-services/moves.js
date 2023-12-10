const apiMoves = require('../feed-apis').moves;

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getSegments,
};

function getOAuthUrl() {
  return apiMoves.oauth.url();
}

function authenticate(code) {
  return apiMoves.oauth.token({ code }).then((data) => {
    const expiry_time = calculateExpiryTime(data.expires_in);
    return { expiry_time, ...data };
  });
}

function deauthorize() {
  return Promise.resolve();
}

function refreshAuth({ refresh_token }) {
  return apiMoves.oauth.refresh({ refresh_token }).then((data) => {
    const expiry_time = calculateExpiryTime(data.expires_in);
    return { expiry_time, ...data };
  });
}

function getSegments(from, to, token) {
  const trackPoints = true;
  return (
    apiMoves.user.storyline.daily
      .get({ from, to, trackPoints, access_token: token })
      // Flatten segments to a 1D array
      .then((storyline) =>
        storyline.reduce(
          (prev, next) => prev.concat([].concat(...next.segments)),
          []
        )
      )
  );
}

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}

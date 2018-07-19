export default {
  make
};

function make({ id, name, getOauthUrl, authenticate, disconnect }) {
  return {
    id,
    name,
    getOauthUrl,
    authenticate,
    disconnect
  };
};

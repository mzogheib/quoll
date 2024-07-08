import moment from "moment";

import * as feedServices from "../feed-services";
import { setFeedAuth, get, getFeedAuth } from "../controllers/users.controller";

export function getOAuthUrl(req, res) {
  const { feed } = req.query;
  const respond = ({ status, message }) => res.status(status).json(message);

  if (!feed) {
    respond({ status: 400, message: "No feed provided." });
  } else {
    const service = feedServices[feed];
    const url = service && service.getOAuthUrl();
    if (!url) {
      respond({ status: 404, message: `Unkown feed: ${feed}` });
    } else {
      respond({ status: 200, message: url });
    }
  }
}

export function authenticate(req, res) {
  const { feed } = req.query;
  const { code } = req.body;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = () => respond({ status: 200 });
  const onError = (error) =>
    respond({ status: error.status || 500, message: error.message });

  if (!feed) {
    respond({ status: 400, message: "No feed provided." });
  } else if (!code) {
    respond({ status: 400, message: "No authorization code provided." });
  } else {
    const service = feedServices[feed];
    const authenticate = service && service.authenticate;
    if (!authenticate) {
      respond({ status: 404, message: `Unkown feed: ${feed}` });
    } else {
      authenticate(code)
        .then((data) => setFeedAuth(userId, feed, data))
        .then(onSuccess)
        .catch(onError);
    }
  }
}

export function checkAuth(req, res, next) {
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onError = (error) =>
    respond({ status: error.status || 500, message: error.message });

  get(userId).then((user) => {
    const promises = user.feeds
      .filter((feed) => feed.auth)
      .map((feed) => {
        if (!feed.auth.expiry_time) {
          return Promise.resolve();
        }

        if (moment().unix() < feed.auth.expiry_time) {
          return Promise.resolve();
        }

        const service = feedServices[feed.name];
        const refreshAuth = service && service.refreshAuth;
        if (!refreshAuth) {
          return Promise.reject(
            onError({
              status: 404,
              message: `Unkown feed: ${feed.name}`,
            }),
          );
        }

        return refreshAuth(feed.auth)
          .then((refreshedAuth) =>
            setFeedAuth(userId, feed.name, refreshedAuth),
          )
          .catch(onError);
      });

    return Promise.all(promises).then(() => next());
  });
}

export function deauthorize(req, res) {
  const { feed } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = () => respond({ status: 204 });
  const onError = (error) =>
    respond({ status: error.status || 500, message: error.message });

  if (!feed) {
    respond({ status: 400, message: "No feed provided." });
  } else {
    const service = feedServices[feed];
    const deauthorize = service && service.deauthorize;
    if (!deauthorize) {
      respond({ status: 404, message: `Unkown feed: ${feed}` });
    } else {
      getFeedAuth(userId, feed)
        .then(deauthorize)
        .then(() => setFeedAuth(userId, feed, null))
        .then(onSuccess)
        .catch(onError);
    }
  }
}

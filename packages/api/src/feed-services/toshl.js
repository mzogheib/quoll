import moment from "moment";

import { toshlApi } from "../feed-apis";
import { ToshlUserModel } from "../models/toshlUser.model";

const { deleteOne, findOne, create } = ToshlUserModel;

export const service = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getEntries,
};

function getOAuthUrl() {
  return toshlApi.oauth.url();
}

const transformAuthResponse = ({
  expires_in,
  access_token,
  refresh_token,
}) => ({
  expiry_time: calculateExpiryTime(expires_in),
  access_token,
  refresh_token,
});

function authenticate(code) {
  return toshlApi.oauth.token({ code }).then(transformAuthResponse);
}

function deauthorize(auth) {
  return toshlApi.oauth.deauthorize({ ...auth }).then(() => {
    deleteOne({ accessToken: auth.access_token }, (error) => {
      // TODO: handle errors
    });
  });
}

function refreshAuth(auth) {
  return toshlApi.oauth.refresh({ ...auth }).then((data) => {
    // Clear cache identified by old access_token
    deleteOne({ accessToken: auth.access_token }, (error) => {
      // TODO: handle errors
    });
    return transformAuthResponse(data);
  });
}

function getTags(accessToken) {
  return new Promise((resolve, reject) => {
    findOne({ accessToken }, (error, toshlUser) => {
      if (error) return reject(error);
      if (toshlUser && toshlUser.tags) return resolve(toshlUser.tags);
      return toshlApi.tags.list({ access_token: accessToken }).then((tags) => {
        create(
          {
            accessToken,
            tags: tags.reduce(
              (prev, tag) => ({
                [tag.id]: tag.name,
                ...prev,
              }),
              {},
            ),
          },
          (error, toshlUser) => {
            if (error) return reject(error);
            return resolve(toshlUser.tags);
          },
        );
      });
    });
  });
}

function getEntries(from, to, token) {
  // Toshl dates are in the user's timezone so convert the ISO string
  // to local (default moment output for an ISO string input) and format
  const fromDate = moment(from).format("YYYY-MM-DD");
  const toDate = moment(to).format("YYYY-MM-DD");
  let decoratedEntries;
  return toshlApi.entries
    .list({ from: fromDate, to: toDate, access_token: token })
    .then((entries) => {
      decoratedEntries = entries;
    })
    .then(() => getTags(token))
    .then((tags) => {
      decoratedEntries.forEach((decoratedEntry) => {
        decoratedEntry.tags = decoratedEntry.tags.map((tagId) => {
          return { id: tagId, name: tags[tagId] || "No tag" };
        });
      });
      return decoratedEntries;
    });
}

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}

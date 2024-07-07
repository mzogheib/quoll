import { UserModel } from "../models/user.model";

const DefaultFeeds = [
  { name: "strava", auth: null },
  { name: "toshl", auth: null },
];

export function createUser() {
  return new Promise((resolve, reject) => {
    UserModel.create({ feeds: DefaultFeeds }, (error, user) => {
      if (error) reject(error);
      else resolve(sanitizeUser(user));
    });
  });
}

export function login(userId) {
  return new Promise((resolve, reject) => {
    UserModel.findById(userId, (error, user) => {
      if (error) reject(error);
      else resolve(sanitizeUser(user));
    });
  });
}

function sanitizeUser(user) {
  if (!user) return;

  const sanitizedUser = user;
  sanitizedUser.feeds = user.feeds.map((feed) => {
    return {
      name: feed.name,
      isConnected: !!feed.auth,
    };
  });
  return sanitizedUser;
}

function get(userId) {
  return new Promise((resolve, reject) => {
    UserModel.findById(userId, (error, user) => {
      if (error) reject(error);
      else resolve(user);
    });
  });
}

function update(user) {
  return new Promise((resolve, reject) => {
    UserModel.updateOne({ _id: user._id }, user, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

export function setFeedAuth(userId, feedName, data) {
  return get(userId)
    .then((user) => {
      user.feeds.find((feed) => feed.name === feedName).auth = data;
      return user;
    })
    .then(update);
}

export function getFeedAuth(userId, feedName) {
  return get(userId).then((user) => {
    return user.feeds.find((feed) => feed.name === feedName).auth;
  });
}

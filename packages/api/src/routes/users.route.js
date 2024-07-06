import {
  login as _login,
  createUser,
  get,
} from "../controllers/users.controller";

export function login(req, res) {
  // TODO: userId should be a bearer token?
  const userId = req.body.userId;

  if (!userId) {
    respond({ status: 400, message: "No client key provided." });
  } else {
    _login(userId).then(onSuccess).catch(onError);
  }

  function onSuccess(user) {
    if (!user) {
      respond({
        status: 404,
        message: `Could not find user with id: ${userId}`,
      });
    } else {
      respond({ status: 200, message: user });
    }
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

export function signup(req, res) {
  createUser().then(onSuccess).catch(onError);

  function onSuccess(user) {
    respond({ status: 200, message: user });
  }

  function onError(error) {
    respond({ status: error.status || 500, message: error.message });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // "Authorization: Basic userId:". Want the userId from that string
    const userId = authHeader.split(" ")[1].split(":")[0];
    const user = get(userId);
    if (user) {
      req.userId = userId;
      next();
    } else {
      respond({ status: 401, message: "Unauthorized" });
    }
  } else {
    respond({ status: 403, message: "No auth provided" });
  }

  function respond(response) {
    res.status(response.status).json(response.message);
  }
}

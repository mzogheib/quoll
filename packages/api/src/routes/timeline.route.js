import { get as getUser } from "../controllers/users.controller";
import { get as getTimeline } from "../controllers/timeline.controller";

export const get = (req, res) => {
  const { from, to } = req.query;
  const { userId } = req;

  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = (data) => respond({ status: 200, message: data });
  const onError = (error) =>
    respond({ status: error.status || 500, message: error.message });

  getUser(userId)
    .then((user) => getTimeline(from, to, user))
    .then(onSuccess)
    .catch(onError);
};

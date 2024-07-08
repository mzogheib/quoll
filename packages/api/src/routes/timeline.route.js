import { get as getUser } from "../controllers/users.controller";
import { get as getTimeline } from "../controllers/timeline.controller";

export const get = async (req, res) => {
  const respond = ({ status, message }) => res.status(status).json(message);
  const onSuccess = (data) => respond({ status: 200, message: data });
  const onError = (error) =>
    respond({ status: error.status || 500, message: error.message });

  try {
    const { from, to } = req.query;
    const { userId } = req;

    const user = await getUser(userId);
    const timeline = await getTimeline(from, to, user);

    onSuccess(timeline);
  } catch (error) {
    onError(error);
  }
};

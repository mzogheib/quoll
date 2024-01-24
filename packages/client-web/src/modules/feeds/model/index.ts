import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FeedName } from "../../../services/feeds/types";
import {
  selectFeeds,
  setFeedAuthenticating,
  setFeedConnected,
} from "../model/store";
import feedsService from "../../../services/feeds";

export const useFeedsModel = () => {
  const dispatch = useDispatch();

  const connect = useCallback(
    async (name: FeedName) => {
      dispatch(setFeedAuthenticating(name, true));
      const url = await feedsService.getOauthUrl(name);
      dispatch(setFeedAuthenticating(name, false));

      return url;
    },
    [dispatch],
  );

  const disconnect = useCallback(
    async (name: FeedName) => {
      dispatch(setFeedAuthenticating(name, true));
      // BE may return a message for further, manual instructions
      const message = await feedsService.deauthorize(name);
      dispatch(setFeedConnected(name, false));
      dispatch(setFeedAuthenticating(name, false));

      return message;
    },
    [dispatch],
  );

  const authenticate = useCallback(
    async (name: FeedName, code: string) => {
      dispatch(setFeedAuthenticating(name, true));
      await feedsService.authenticate(name, { code });
      dispatch(setFeedConnected(name, true));
      dispatch(setFeedAuthenticating(name, false));
    },
    [dispatch],
  );

  const feeds = Object.values(useSelector(selectFeeds));

  return {
    feeds,
    connect,
    disconnect,
    authenticate,
  };
};

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FeedName } from "../types";
import {
  selectFeeds,
  selectHasFeedConnected,
  setFeedAuthenticating,
  setFeedConnected,
} from "./store";
import feedsService from "../service";

export const useFeedsModel = () => {
  const dispatch = useDispatch();

  const _feeds = useSelector(selectFeeds);
  const feeds = useMemo(() => Object.values(_feeds), [_feeds]);

  const isOneConnected = useSelector(selectHasFeedConnected);

  const setConnected = useCallback(
    (name: FeedName, value: boolean) => {
      dispatch(setFeedConnected(name, value));
    },
    [dispatch],
  );

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
      setConnected(name, false);
      dispatch(setFeedAuthenticating(name, false));

      return message;
    },
    [dispatch, setConnected],
  );

  const authenticate = useCallback(
    async (name: FeedName, code: string) => {
      dispatch(setFeedAuthenticating(name, true));
      await feedsService.authenticate(name, { code });
      setConnected(name, true);
      dispatch(setFeedAuthenticating(name, false));
    },
    [dispatch, setConnected],
  );

  return {
    feeds,
    isOneConnected,
    connect,
    disconnect,
    authenticate,
    setConnected,
  };
};

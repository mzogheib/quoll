import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FeedName } from "../../../services/feeds/types";
import {
  authenticateFeed,
  disconnectFeed,
  getOauthUrl,
  selectFeeds,
} from "../model/store";

export const useFeedsModel = () => {
  const dispatch = useDispatch();

  const connect = useCallback(
    (name: FeedName) => getOauthUrl(name)(dispatch),
    [dispatch],
  );

  const disconnect = useCallback(
    (name: FeedName) => disconnectFeed(name)(dispatch),
    [dispatch],
  );

  const authenticate = useCallback(
    (name: FeedName, code: string) => authenticateFeed(name, code)(dispatch),
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

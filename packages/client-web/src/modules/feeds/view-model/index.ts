import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FeedName } from "../../../services/feeds/types";
import {
  authenticateFeed,
  disconnectFeed,
  getOauthUrl,
  selectFeeds,
} from "../model/store";

export const useFeedsViewModel = () => {
  const dispatch = useDispatch();

  const onConnect = useCallback(
    (name: FeedName) => getOauthUrl(name)(dispatch),
    [dispatch],
  );

  const onDisconnect = useCallback(
    (name: FeedName) => disconnectFeed(name)(dispatch),
    [dispatch],
  );

  const onOauthCodeReceived = useCallback(
    (name: FeedName, code: string) => authenticateFeed(name, code)(dispatch),
    [dispatch],
  );

  const feeds = Object.values(useSelector(selectFeeds));

  return {
    feeds,
    onConnect,
    onDisconnect,
    onOauthCodeReceived,
  };
};

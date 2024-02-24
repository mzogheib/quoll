import { useFeedsModel as _useFeedsModel } from "@quoll/client-lib";

import { useStore } from "./store";
import feedsService from "../service";

export const useFeedsModel = () => _useFeedsModel(useStore, feedsService);

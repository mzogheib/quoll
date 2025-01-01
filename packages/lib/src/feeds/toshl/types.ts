// https://developer.toshl.com/docs

export type ToshlTag = {
  id: string;
  name: string;
};

type ToshlEntryCurrency = {
  code: string;
};

export type ToshlEntryLocation = {
  id: string;
  latitude: number;
  longitude: number;
};

export type ToshlEntry = {
  id: string;
  amount: number;
  currency: ToshlEntryCurrency;
  tags: string[];
  desc: string;
  /**
   * Date in ISO 8601.
   *
   * @example "2018-07-21"
   */
  date: string;
  location: ToshlEntryLocation;
};

/**
 * Toshl entry with resolved properties, e.g. `tags`.
 */
export type ToshlResolvedEntry = Omit<ToshlEntry, "tags"> & {
  tags: ToshlTag[];
};

import {
  extractISO8601Time,
  getUnixTimestamp,
  startsWithISO8601Time,
} from "../../../date";
import { generateRandomString } from "../../../misc/randomString";
import { formatAmount } from "../../../misc/currency";
import { TimelineEntry, TimelineEntryLocation } from "../../types";
import { ToshlEntry, ToshlLocation } from "./types";

const DefaultTime = "12:00:00";

const adaptLocation = ({
  latitude,
  longitude,
}: ToshlLocation): TimelineEntryLocation => ({
  latitude,
  longitude,
});

export const toshlEntriesAdapter = (entries: ToshlEntry[]): TimelineEntry[] => {
  return entries.map((entry) => {
    const { amount, currency, tags, desc, date, location } = entry;

    const type = amount < 0 ? "expense" : "income";
    const _tags = tags.map((tag) => tag.name).join(", ");
    const time = extractISO8601Time(desc) || DefaultTime;
    const timeStart = getUnixTimestamp(new Date(`${date} ${time}`));
    const timeEnd = timeStart;
    const locationStart = location ? adaptLocation(location) : null;
    const locationEnd = locationStart;
    const description = startsWithISO8601Time(desc)
      ? desc.split("\n").slice(2).join("\n")
      : desc;
    const _amount = formatAmount(amount, currency.code);

    return {
      feed: "toshl",
      id: generateRandomString(32),
      type,
      timeStart,
      timeEnd,
      title: _tags,
      valueLabel: _amount,
      description,
      locationStart,
      locationEnd,
      polyline: null,
      mediaUri: null,
    };
  });
};

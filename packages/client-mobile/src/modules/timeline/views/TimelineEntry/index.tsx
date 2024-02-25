import { getTimelineEntryImage } from "@quoll/client-lib";
import {
  TimelineEntry as ITimelineEntry,
  makeDateFromUnixTimestamp,
  makeTimeString,
} from "@quoll/lib";
import { TouchableHighlight, Text, View } from "react-native";

interface Props {
  entry: ITimelineEntry;
  onPress: () => void;
}

const TimelineEntry = ({ entry, onPress }: Props) => {
  const image = getTimelineEntryImage(entry);
  const startDate = makeDateFromUnixTimestamp(entry.timeStart);
  const time = makeTimeString(startDate);

  return (
    <TouchableHighlight onPress={onPress}>
      <View>
        <Text>{entry.feed}</Text>
        <Text>{time}</Text>
        <Text>{image}</Text>
        <Text>{entry.title}</Text>
        <Text>{entry.valueLabel}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TimelineEntry;

import { getTimelineEntryImage } from "@quoll/client-lib";
import { TimelineEntry as ITimelineEntry } from "@quoll/lib";
import { TouchableHighlight, Text } from "react-native";

interface Props {
  entry: ITimelineEntry;
  onPress: () => void;
}

const TimelineEntry = ({ entry, onPress }: Props) => {
  const image = getTimelineEntryImage(entry);

  return (
    <TouchableHighlight onPress={onPress}>
      <Text>{entry.feed}</Text>
      <Text>{entry.timeStart}</Text>
      <Text>{image}</Text>
      <Text>{entry.title}</Text>
      <Text>{entry.valueLabel}</Text>
    </TouchableHighlight>
  );
};

export default TimelineEntry;

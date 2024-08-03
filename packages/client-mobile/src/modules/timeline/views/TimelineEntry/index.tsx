import FeedLogo from "@components/FeedLogo";
import { getTimelineEntryImage } from "@quoll/client-lib/modules";
import {
  TimelineEntry as ITimelineEntry,
  makeDateFromUnixTimestamp,
  makeTimeString,
} from "@quoll/lib";
import { TouchableHighlight, Text, View } from "react-native";
import styles from "./styles";

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
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <FeedLogo name={entry.feed} size={28} />
        </View>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.image}>{image}</Text>
        <Text style={styles.label}>{entry.title}</Text>
        <Text style={styles.value}>{entry.valueLabel}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TimelineEntry;

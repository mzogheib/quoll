import React from "react";
import { View } from "react-native";
import { TimelineEntry as ITimelineEntry } from "@quoll/lib/modules";

import TimelineEntry from "../TimelineEntry";

interface Props {
  entries: ITimelineEntry[];
  onEntryPress: (id: string) => void;
}

const Timeline = ({ entries, onEntryPress }: Props) => (
  <View>
    {entries
      .sort((a, b) => a.timeStart - b.timeStart)
      .map((entry, index) => (
        <TimelineEntry
          key={index}
          entry={entry}
          onPress={() => onEntryPress(entry.id)}
        />
      ))}
  </View>
);

export default Timeline;

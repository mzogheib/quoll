import styled from "styled-components";
import { TimelineEntry as ITimelineEntry } from "@quoll/lib/modules";

import TimelineEntry from "../TimelineEntry";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  entries: ITimelineEntry[];
  onEntryClick: (id: string) => void;
}

const Timeline = ({ entries, onEntryClick }: Props) => (
  <Wrapper>
    {entries
      .sort((a, b) => a.timeStart - b.timeStart)
      .map((entry, index) => (
        <TimelineEntry
          key={index}
          entry={entry}
          onClick={() => onEntryClick(entry.id)}
        />
      ))}
  </Wrapper>
);

export default Timeline;

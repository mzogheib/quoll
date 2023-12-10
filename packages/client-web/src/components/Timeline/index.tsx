import styled from "styled-components";

import TimelineEntry from "../TimelineEntry";
import { Entry } from "../../services/timeline/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  entries: Entry[];
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

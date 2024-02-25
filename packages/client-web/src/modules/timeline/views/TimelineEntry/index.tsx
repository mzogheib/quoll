import styled, { css } from "styled-components";
import {
  TimelineEntry as ITimelineEntry,
  makeDateFromUnixTimestamp,
  makeTimeString,
} from "@quoll/lib";
import { getTimelineEntryImage } from "@quoll/client-lib";

import FeedLogo from "components/FeedLogo";

const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    padding: 4px 10px;

    &:hover {
      cursor: pointer;
      background-color: ${colors.gainsboro};
    }
  `,
);

const Logo = styled.div`
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
  }
`;

const Time = styled.div`
  flex-basis: 75px;
  text-align: right;
  flex-shrink: 0;
`;

const Image = styled.div`
  text-align: center;
  flex-basis: 70px;
  font-size: 22px;
`;

const Label = styled.div`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  margin: 0 0 0 5px;
  flex-shrink: 0;
`;

interface Props {
  entry: ITimelineEntry;
  onClick: () => void;
}

const TimelineEntry = ({ entry, onClick }: Props) => {
  const image = getTimelineEntryImage(entry);
  const startDate = makeDateFromUnixTimestamp(entry.timeStart);
  const time = makeTimeString(startDate);

  return (
    <Wrapper onClick={onClick}>
      <Logo>
        <FeedLogo name={entry.feed} />
      </Logo>
      <Time>{time}</Time>
      <Image>{image}</Image>
      <Label>{entry.title}</Label>
      <Value>{entry.valueLabel}</Value>
    </Wrapper>
  );
};

export default TimelineEntry;

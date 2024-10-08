import { useState } from "react";
import styled, { css } from "styled-components";
import { Calendar, IconButton } from "@quoll/ui-components";
import {
  ISO8601Date,
  getOffsetDate,
  makeISO8601Date,
} from "@quoll/lib/modules";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const DateLabel = styled.div<{ disabled: boolean }>(
  ({ theme: { colors }, disabled }) => css`
    flex-grow: 1;
    text-align: center;
    cursor: ${disabled ? "unset" : "pointer"};
    color: ${disabled ? colors.grey : "inherit"};
  `,
);

const CalendarWrapper = styled.div(
  ({ theme: { media } }) => css`
    position: absolute;
    top: 40px;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;

    ${media.breakpointDown(media.md)`
      top: -300px;
    `};
  `,
);

const StyledCalendar = styled(Calendar)`
  box-shadow: 2px 2px 12px;
`;

interface Props {
  date: ISO8601Date;
  maxDate: ISO8601Date;
  calendarDisabled: boolean;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onDateChange: (date: ISO8601Date) => void;
}

const DatePicker = (props: Props) => {
  const {
    date,
    maxDate,
    calendarDisabled,
    prevDisabled,
    nextDisabled,
    onDateChange,
  } = props;

  const [showCalendar, setShowCalendar] = useState(false);

  const previous = () => {
    const yesterday = getOffsetDate(new Date(date), -1);
    handleDateChange(yesterday);
  };

  const next = () => {
    const tomorrow = getOffsetDate(new Date(date), 1);
    handleDateChange(tomorrow);
  };

  const handleDateChange = (newDate: Date | Date[]) => {
    if (Array.isArray(newDate)) return;

    onDateChange(makeISO8601Date(newDate));
    setShowCalendar(false);
  };

  const handleDateClick = () => {
    if (!calendarDisabled) {
      setShowCalendar(!showCalendar);
    }
  };

  return (
    <Wrapper>
      <IconButton icon="Previous" disabled={prevDisabled} onClick={previous} />
      <DateLabel disabled={calendarDisabled} onClick={handleDateClick}>
        {date}
      </DateLabel>
      <IconButton icon="Next" disabled={nextDisabled} onClick={next} />
      {showCalendar && (
        <CalendarWrapper>
          <StyledCalendar
            maxDate={new Date(maxDate)}
            value={new Date(date)}
            onChange={handleDateChange}
          />
        </CalendarWrapper>
      )}
    </Wrapper>
  );
};

export default DatePicker;

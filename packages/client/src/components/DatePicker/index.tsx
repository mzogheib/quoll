import { useState } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { Calendar, IconButton } from '@quoll/ui-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const DateLabel = styled.div<{ disabled: boolean }>(
  ({ theme: { colors }, disabled }) => css`
    flex-grow: 1;
    text-align: center;
    cursor: ${disabled ? 'unset' : 'pointer'};
    color: ${disabled ? colors.grey : 'inherit'};
  `
)

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
  `
)

const StyledCalendar = styled(Calendar)`
  box-shadow: 2px 2px 12px;
`

interface Props {
  date: string
  maxDate: string
  calendarDisabled: boolean
  prevDisabled: boolean
  nextDisabled: boolean
  onDateChange: (date: string) => void
}

const DatePicker = (props: Props) => {
  const {
    date,
    maxDate,
    calendarDisabled,
    prevDisabled,
    nextDisabled,
    onDateChange,
  } = props

  const [showCalendar, setShowCalendar] = useState(false)

  const previous = () => {
    const yesterday = moment(date).subtract(1, 'day')
    handleDateChange(yesterday.toDate())
  }

  const next = () => {
    const tomorrow = moment(date).add(1, 'day')
    handleDateChange(tomorrow.toDate())
  }

  const handleDateChange = (newDate: Date | Date[]) => {
    if (Array.isArray(newDate)) return

    onDateChange(moment(newDate).format('YYYY-MM-DD'))
    setShowCalendar(false)
  }

  const handleDateClick = () => {
    if (!calendarDisabled) {
      setShowCalendar(!showCalendar)
    }
  }

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
  )
}

export default DatePicker

import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Calendar, IconButton } from '@quoll/ui-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const DateLabel = styled.div(
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

const DatePicker = (props) => {
  const [showCalendar, setShowCalendar] = useState(false)

  const previous = () => {
    const yesterday = moment(props.date).subtract(1, 'day')
    handleDateChange(yesterday)
  }

  const next = () => {
    const tomorrow = moment(props.date).add(1, 'day')
    handleDateChange(tomorrow)
  }

  const handleDateChange = (date) => {
    props.onDateChange(moment(date).format('YYYY-MM-DD'))
    setShowCalendar(false)
  }

  const handleDateClick = () => {
    if (!props.calendarDisabled) {
      setShowCalendar(!showCalendar)
    }
  }

  const { prevDisabled, nextDisabled, calendarDisabled } = props
  return (
    <Wrapper>
      <IconButton.Previous disabled={prevDisabled} onClick={previous} />
      <DateLabel disabled={calendarDisabled} onClick={handleDateClick}>
        {props.date}
      </DateLabel>
      <IconButton.Next disabled={nextDisabled} onClick={next} />
      {showCalendar && (
        <CalendarWrapper>
          <StyledCalendar
            maxDate={new Date(props.maxDate)}
            value={new Date(props.date)}
            onChange={handleDateChange}
          />
        </CalendarWrapper>
      )}
    </Wrapper>
  )
}

DatePicker.propTypes = {
  date: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  calendarDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
  onDateChange: PropTypes.func.isRequired,
}

DatePicker.defaultProps = {
  calendarDisabled: false,
  prevDisabled: false,
  nextDisabled: false,
}

export default DatePicker

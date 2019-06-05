import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import Calendar from 'react-calendar'
import moment from 'moment'

import IconButton from '../IconButton'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .react-calendar__tile,
  .react-calendar__navigation__label {
    font-family: Roboto;
  }
`

const DateLabel = styled.div(
  ({ theme: { colors }, disabled }) => css`
    flex-grow: 1;
    text-align: center;
    cursor: ${disabled ? 'unset' : 'pointer'};
    color: ${disabled ? colors.grey : 'inherit'};
  `
)

const CalendarWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
`

const StyledCalendar = styled(Calendar)`
  box-shadow: 2px 2px 12px;
  max-width: 300px !important;
  font-family: Roboto !important;
`

export default class DatePicker extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    calendarDisabled: PropTypes.bool,
    onDateChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    calendarDisabled: false,
  }

  iconSize = 40

  state = {
    showCalendar: false,
  }

  previous = () => {
    const yesterday = moment(this.props.date).subtract(1, 'day')
    this.handleDateChange(yesterday)
  }

  next = () => {
    const tomorrow = moment(this.props.date).add(1, 'day')
    this.handleDateChange(tomorrow)
  }

  handleDateChange = date => {
    this.props.onDateChange(moment(date).format('YYYY-MM-DD'))
    this.setState({ showCalendar: false })
  }

  handleDateClick = () => {
    if (!this.props.calendarDisabled) {
      this.setState({ showCalendar: !this.state.showCalendar })
    }
  }

  render() {
    const { prevDisabled, nextDisabled, calendarDisabled } = this.props
    const { showCalendar } = this.state
    return (
      <Wrapper>
        <IconButton.Previous
          disabled={prevDisabled}
          size={this.iconSize}
          onClick={this.previous}
        />
        <DateLabel disabled={calendarDisabled} onClick={this.handleDateClick}>
          {this.props.date}
        </DateLabel>
        <IconButton.Next
          disabled={nextDisabled}
          size={this.iconSize}
          onClick={this.next}
        />
        {showCalendar && (
          <CalendarWrapper>
            <StyledCalendar
              maxDate={new Date(this.props.maxDate)}
              value={new Date(this.props.date)}
              onChange={this.handleDateChange}
            />
          </CalendarWrapper>
        )}
      </Wrapper>
    )
  }
}

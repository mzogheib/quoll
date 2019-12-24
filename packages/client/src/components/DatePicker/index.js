import React, { Component } from 'react'
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

export default class DatePicker extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    calendarDisabled: PropTypes.bool,
    prevDisabled: PropTypes.bool,
    nextDisabled: PropTypes.bool,
    onDateChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    calendarDisabled: false,
    prevDisabled: false,
    nextDisabled: false,
  }

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
        <IconButton.Previous disabled={prevDisabled} onClick={this.previous} />
        <DateLabel disabled={calendarDisabled} onClick={this.handleDateClick}>
          {this.props.date}
        </DateLabel>
        <IconButton.Next disabled={nextDisabled} onClick={this.next} />
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

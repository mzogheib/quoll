import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-calendar'
import moment from 'moment'

import Icon from '../Icon'
import './style.scss'

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

  renderDate = () => (
    <div className="date-picker__date" onClick={this.handleDateClick}>
      {this.props.date}
    </div>
  )

  renderDateDisabled = () => (
    <div className="date-picker__date-disabled">{this.props.date}</div>
  )

  renderCalendar = () => (
    <div className="date-picker__calendar-wrapper">
      <Calendar
        className="date-picker__calendar"
        maxDate={new Date(this.props.maxDate)}
        value={new Date(this.props.date)}
        onChange={this.handleDateChange}
      />
    </div>
  )

  renderPrevious = () => (
    <Icon.Previous
      className="date-picker__button"
      size={this.iconSize}
      onClick={this.previous}
    />
  )

  renderNext = () => (
    <Icon.Next
      className="date-picker__button"
      size={this.iconSize}
      onClick={this.next}
    />
  )

  renderPrevDisabled = () => (
    <Icon.Previous
      className="date-picker__button-disabled"
      color={'#7f7f7f'}
      size={this.iconSize}
    />
  )

  renderNextDisabled = () => (
    <Icon.Next
      className="date-picker__button-disabled"
      color={'#7f7f7f'}
      size={this.iconSize}
    />
  )

  render() {
    const { prevDisabled, nextDisabled, calendarDisabled } = this.props
    const { showCalendar } = this.state
    return (
      <div className="date-picker">
        {prevDisabled ? this.renderPrevDisabled() : this.renderPrevious()}
        {calendarDisabled ? this.renderDateDisabled() : this.renderDate()}
        {showCalendar && this.renderCalendar()}
        {nextDisabled ? this.renderNextDisabled() : this.renderNext()}
      </div>
    )
  }
}

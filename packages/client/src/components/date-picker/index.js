import React, { Component } from 'react'
import './style.scss'
import PreviousIcon from 'react-icons/lib/md/navigate-before'
import NextIcon from 'react-icons/lib/md/navigate-next'
import Calendar from 'react-calendar'
import moment from 'moment'

export default class DatePicker extends Component {
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
        maxDate={this.props.maxDate}
        value={new Date(this.props.date)}
        onChange={this.handleDateChange}
      />
    </div>
  )

  renderPrevious = () => (
    <PreviousIcon
      className="date-picker__button"
      size={this.iconSize}
      onClick={this.previous}
    />
  )

  renderNext = () => (
    <NextIcon
      className="date-picker__button"
      size={this.iconSize}
      onClick={this.next}
    />
  )

  renderPrevDisabled = () => (
    <PreviousIcon
      className="date-picker__button-disabled"
      color={'#7f7f7f'}
      size={this.iconSize}
    />
  )

  renderNextDisabled = () => (
    <NextIcon
      className="date-picker__button-disabled"
      color={'#7f7f7f'}
      size={this.iconSize}
    />
  )

  render() {
    return (
      <div className="date-picker">
        {this.props.prevDisabled
          ? this.renderPrevDisabled()
          : this.renderPrevious()}
        {this.props.calendarDisabled
          ? this.renderDateDisabled()
          : this.renderDate()}
        {this.state.showCalendar && this.renderCalendar()}
        {this.props.nextDisabled
          ? this.renderNextDisabled()
          : this.renderNext()}
      </div>
    )
  }
}

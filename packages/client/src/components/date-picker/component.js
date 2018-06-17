import React, { Component } from 'react';
import './style.css';
import PreviousIcon from 'react-icons/lib/md/navigate-before';
import NextIcon from 'react-icons/lib/md/navigate-next';
import Calendar from 'react-calendar';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.iconSize = 40;
    this.today = new Date();
  }

  formatDate(date) {
    const dateParts = date.toLocaleDateString().split('/'); // => [dd, mm, yyyy]
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  previous() {
    this.setState({ showCalendar: false });
    const yesterday = new Date(this.props.date);
    yesterday.setDate(yesterday.getDate() - 1);
    this.props.onDateChange(this.formatDate(yesterday));
  }

  next() {
    this.setState({ showCalendar: false });
    const tomorrow = new Date(this.props.date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.props.onDateChange(this.formatDate(tomorrow));
  }

  handleDateChange(date) {
    this.setState({ showCalendar: false });
    const dateComponents = date.toLocaleDateString().split('/'); // => [dd, mm, yyyy]
    const dateString = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`
    this.props.onDateChange(dateString);
  }

  handleDateClick() {
    this.setState({ showCalendar: !this.state.showCalendar });
  }

  renderCalendar() {
    return (
      <div className='date-picker__calendar-wrapper'>
        <Calendar
          className='date-picker__calendar'
          maxDate={this.today}
          value={new Date(this.props.date)}
          onChange={this.handleDateChange}
        />
      </div>
    )
  }

  render() {
    return (
      <div className='date-picker'>
        <PreviousIcon className='date-picker__button' size={this.iconSize} onClick={this.previous}/>
        <div className='date-picker__date' onClick={this.handleDateClick}>{this.props.date}</div>
        {this.state.showCalendar && this.renderCalendar()}
        <NextIcon className='date-picker__button' size={this.iconSize} onClick={this.next}/>
      </div>
    );
  }
}

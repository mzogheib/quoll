import React, { Component } from 'react';
import './style.css';
import PreviousIcon from 'react-icons/lib/md/navigate-before';
import NextIcon from 'react-icons/lib/md/navigate-next';
import Calendar from 'react-calendar';
import moment from 'moment';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      nextDayDisabled: true
    };
    this.isNextDayDisabled = this.isNextDayDisabled.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.iconSize = 40;
    this.today = moment().endOf('day');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ nextDayDisabled: this.isNextDayDisabled(moment(nextProps.date)) });
  }

  isNextDayDisabled(date) {
    return date.add(1, 'day').isAfter(this.today);
  }

  previous() {
    const yesterday = moment(this.props.date).subtract(1, 'day');
    this.handleDateChange(yesterday);
  }

  next() {
    const tomorrow = moment(this.props.date).add(1, 'day');
    this.handleDateChange(tomorrow);
  }

  handleDateChange(date) {
    this.props.onDateChange(moment(date).format('YYYY-MM-DD'));
    this.setState({ showCalendar: false });
  }

  handleDateClick() {
    this.setState({ showCalendar: !this.state.showCalendar });
  }

  renderCalendar() {
    return (
      <div className='date-picker__calendar-wrapper'>
        <Calendar
          className='date-picker__calendar'
          maxDate={this.today.toDate()}
          value={new Date(this.props.date)}
          onChange={this.handleDateChange}
        />
      </div>
    )
  }

  renderPrevious() {
    return (
      <PreviousIcon className='date-picker__button' size={this.iconSize} onClick={this.previous}/>
    )
  }

  renderNext() {
    return (
      <NextIcon className='date-picker__button' size={this.iconSize} onClick={this.next}/>
    )
  }

  renderNextDisabled() {
    return (
      <NextIcon className='date-picker__button-disabled' color={'#7f7f7f'} size={this.iconSize}/>
    )
  }

  render() {
    return (
      <div className='date-picker'>
        {this.renderPrevious()}
        <div className='date-picker__date' onClick={this.handleDateClick}>{this.props.date}</div>
        {this.state.showCalendar && this.renderCalendar()}
        {this.state.nextDayDisabled ? this.renderNextDisabled() : this.renderNext()}
      </div>
    );
  }
}

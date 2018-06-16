import React from 'react';
import './style.css';
import PreviousIcon from 'react-icons/lib/md/navigate-before';
import NextIcon from 'react-icons/lib/md/navigate-next';

function DatePicker(props) {
  const iconSize = 40;

  function formatDate(date) {
    const dateParts = date.toLocaleDateString().split('/'); // => [dd, mm, yyyy]
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  function previous() {
    const yesterday = new Date(props.date);
    yesterday.setDate(yesterday.getDate() - 1);
    props.onDateChange(formatDate(yesterday));
  }

  function next() {
    const tomorrow = new Date(props.date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    props.onDateChange(formatDate(tomorrow));
  }

  function handleDateChange(e) {
    props.onDateChange(e.target.value)
  }

  return (
    <div className='date-picker'>
      <PreviousIcon className='date-picker__button' size={iconSize} onClick={previous}/>
      <input className='date-picker__date-input' type='date' value={props.date} onChange={handleDateChange} />
      <NextIcon className='date-picker__button' size={iconSize} onClick={next}/>
    </div>
  );
}

export default DatePicker;

import React from 'react';
import './style.css';

function FilterControls(props) {

  function formatDate(date) {
    const dateParts = date.toLocaleDateString().split('/'); // => [dd, mm, yyyy]
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  function previous() {
    const yesterday = new Date(props.date);
    yesterday.setDate(yesterday.getDate() - 1);
    props.setDate(formatDate(yesterday));
  }

  function next() {
    const tomorrow = new Date(props.date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    props.setDate(formatDate(tomorrow));
  }

  function handleDateChange(e) {
    props.setDate(e.target.value)
  }

  return (
    <div className='date-picker-controls'>
      <button className='date-picker-controls__button' onClick={previous}>Previous</button>
      <input className='date-picker-controls__date-input' type='date' value={props.date} onChange={handleDateChange} />
      <button className='date-picker-controls__button' onClick={next}>Next</button>
    </div>
  );
}

export default FilterControls;

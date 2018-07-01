import React from 'react';
import './style.css';

function FeedEntry({ entry, onClick }) {

  function render() {
    return (
      <div className='feed-entry' onClick={onClick}>
        <div className='feed-entry__logo'><img src={entry.logo} alt='feed logo'/></div>
        <div className='feed-entry__time-label'>{entry.timeLabel}</div>
        <div className='feed-entry__image'>{entry.image}</div>
        <div className='feed-entry__label'>{entry.label}</div>
        <div className='feed-entry__value'>{entry.value}</div>
      </div>
    );
  }

  return render();
}

export default FeedEntry;

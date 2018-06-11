import React from 'react';
import './style.css';

function FeedEntries(props) {

  function handleClick(entry) {
    props.onEntryClick(entry.id)
  }

  function renderLoading() {
    return (
      <div>Loading...</div>
    );
  }

  function renderNone() {
    return (
      <div>None</div>
    );
  }

  function renderEntries(list) {
    return list.sort((a, b) => a.timeStamp - b.timeStamp).map((entry, index) => (
      <div key={index} onClick={() => handleClick(entry)} className='feed-entries__entry'>
        <span className='feed-entries__entry-time-label'>{entry.timeLabel}</span>
        <span className='feed-entries__entry-label'>{entry.label}</span>
        <span className='feed-entries__entry-value'>{entry.value}</span>
      </div>
    ));
  }

  function render() {
    const list = props.feeds.reduce((prev, next) => prev.concat([].concat(...next.summaryList)), []);
    const isLoading = props.feeds.reduce((prev, next) => prev || next.isLoading, false);
    return (
      <div className='feed-entries'>{isLoading ? renderLoading() : list.length ? renderEntries(list) : renderNone()}</div>
    );
  }
  
  return render();
}

export default FeedEntries;

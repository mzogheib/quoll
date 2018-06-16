import React from 'react';
import './style.css';
import FeedEntry from '../feed-entry';

function FeedEntries(props) {

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
      <FeedEntry key={index} entry={entry} onClick={() => props.onEntryClick(entry.id)}/>
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

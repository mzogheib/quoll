import React from 'react';
import './style.css';
import FeedEntry from '../feed-entry';

function Feed(props) {

  function renderEntries(entries) {
    return entries.sort((a, b) => a.timeStamp - b.timeStamp).map((entry, index) => (
      <FeedEntry key={index} entry={entry} onClick={() => props.onEntryClick(entry.id)}/>
    ));
  }

  function render() {
    const entries = props.feeds.reduce((prev, next) => prev.concat([].concat(...next.entries)), []);
    return (
      <div className='feed'>{renderEntries(entries)}</div>
    );
  }
  
  return render();
}

export default Feed;

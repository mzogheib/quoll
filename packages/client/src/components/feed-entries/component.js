import React from 'react';
import './style.css';
import FeedEntry from '../feed-entry';

function FeedEntries(props) {

  function renderEntries(list) {
    return list.sort((a, b) => a.timeStamp - b.timeStamp).map((entry, index) => (
      <FeedEntry key={index} entry={entry} onClick={() => props.onEntryClick(entry.id)}/>
    ));
  }

  function render() {
    const list = props.feeds.reduce((prev, next) => prev.concat([].concat(...next.summaryList)), []);
    return (
      <div className='feed-entries'>{renderEntries(list)}</div>
    );
  }
  
  return render();
}

export default FeedEntries;

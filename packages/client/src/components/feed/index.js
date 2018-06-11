import React from 'react';
import './style.css';
import DatePicker from '../date-picker';
import FeedEntries from '../feed-entries';

function Feed() {
  return (
    <div className='feed'>
      <div className='feed__filter'><DatePicker /></div>
      <div className='feed__entries'><FeedEntries /></div>
    </div>
  );
}

export default Feed;

import React from 'react'
import './style.scss'
import FeedEntry from '../FeedEntry'

const Feed = ({ feed, onEntryClick }) => {
  const renderEntries = entries =>
    entries
      .sort((a, b) => a.timeStart - b.timeStart)
      .map((entry, index) => (
        <FeedEntry
          key={index}
          entry={entry}
          onClick={() => onEntryClick(entry.id)}
        />
      ))

  return <div className="feed">{renderEntries(feed.entries)}</div>
}

export default Feed

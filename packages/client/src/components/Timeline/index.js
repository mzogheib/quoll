import React from 'react'
import './style.scss'
import TimelineEntry from '../TimelineEntry'

const Timeline = ({ timeline, onEntryClick }) => {
  const renderEntries = entries =>
    entries
      .sort((a, b) => a.timeStart - b.timeStart)
      .map((entry, index) => (
        <TimelineEntry
          key={index}
          entry={entry}
          onClick={() => onEntryClick(entry.id)}
        />
      ))

  return <div className="timeline">{renderEntries(timeline.entries)}</div>
}

export default Timeline

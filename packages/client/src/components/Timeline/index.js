import React from 'react'
import PropTypes from 'prop-types'

import TimelineEntry from '../TimelineEntry'
import './style.scss'

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

Timeline.propTypes = {
  timeline: PropTypes.shape({
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timeStart: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  onEntryClick: PropTypes.func.isRequired,
}

export default Timeline

import React from 'react'
import PropTypes from 'prop-types'

import TimelineEntry from '../TimelineEntry'
import './style.scss'

const Timeline = ({ entries, onEntryClick }) => (
  <div className="timeline">
    {entries.sort((a, b) => a.timeStart - b.timeStart).map((entry, index) => (
      <TimelineEntry
        key={index}
        entry={entry}
        onClick={() => onEntryClick(entry.id)}
      />
    ))}
  </div>
)

Timeline.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timeStart: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onEntryClick: PropTypes.func.isRequired,
}

export default Timeline

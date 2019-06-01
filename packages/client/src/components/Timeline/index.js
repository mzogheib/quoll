import React from 'react'
import PropTypes from 'prop-types'

import Flex from '../Flex'
import TimelineEntry from '../TimelineEntry'

const Timeline = ({ entries, onEntryClick }) => (
  <Flex flexDirection="column">
    {entries.sort((a, b) => a.timeStart - b.timeStart).map((entry, index) => (
      <TimelineEntry
        key={index}
        entry={entry}
        onClick={() => onEntryClick(entry.id)}
      />
    ))}
  </Flex>
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

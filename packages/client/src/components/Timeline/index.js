import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import TimelineEntry from '../TimelineEntry'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Timeline = ({ entries, onEntryClick }) => (
  <Wrapper>
    {entries.sort((a, b) => a.timeStart - b.timeStart).map((entry, index) => (
      <TimelineEntry
        key={index}
        entry={entry}
        onClick={() => onEntryClick(entry.id)}
      />
    ))}
  </Wrapper>
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

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './style.scss'

const TimelineEntry = ({ entry, onClick }) => (
  <div className="timeline-entry" onClick={onClick}>
    <div className="timeline-entry__logo">
      <img src={entry.logo} alt="feed logo" />
    </div>
    <div className="timeline-entry__time-label">
      {moment.unix(entry.timeStart).format('h:mm a')}
    </div>
    <div className="timeline-entry__image">{entry.image}</div>
    <div className="timeline-entry__label">{entry.title}</div>
    <div className="timeline-entry__value">{entry.valueLabel}</div>
  </div>
)

TimelineEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    valueLabel: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    timeStart: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TimelineEntry

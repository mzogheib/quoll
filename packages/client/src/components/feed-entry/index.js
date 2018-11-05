import React from 'react'
import moment from 'moment'
import './style.scss'

function FeedEntry({ entry, onClick }) {
  function render() {
    return (
      <div className="feed-entry" onClick={onClick}>
        <div className="feed-entry__logo">
          <img src={entry.logo} alt="feed logo" />
        </div>
        <div className="feed-entry__time-label">
          {moment.unix(entry.timeStart).format('h:mm a')}
        </div>
        <div className="feed-entry__image">{entry.image}</div>
        <div className="feed-entry__label">{entry.title}</div>
        <div className="feed-entry__value">{entry.valueLabel}</div>
      </div>
    )
  }

  return render()
}

export default FeedEntry

import React from 'react';
import './style.css';

function MenuItems(props) {

  function handleClick(entry) {
    props.onEntryClick(entry.id)
  }

  function renderLoading() {
    return (
      <div>Loading...</div>
    );
  }

  function renderNone() {
    return (
      <div>None</div>
    );
  }

  function renderList(list) {
    return list.sort((a, b) => a.timeStamp - b.timeStamp).map((entry, index) => (
      <div key={index} onClick={() => handleClick(entry)} className='menu-items__entry'>
        <span className='menu-items__entry-time-label'>{entry.timeLabel}</span>
        <span className='menu-items__entry-label'>{entry.label}</span>
        <span className='menu-items__entry-value'>{entry.value}</span>
      </div>
    ));
  }

  function render() {
    const list = props.feeds.reduce((prev, next) => prev.concat([].concat(...next.summaryList)), []);
    const isLoading = props.feeds.reduce((prev, next) => prev || next.isLoading, false);
    return (
      <div className='menu-items'>{isLoading ? renderLoading() : list.length ? renderList(list) : renderNone()}</div>
    );
  }
  
  return render();
}

export default MenuItems;

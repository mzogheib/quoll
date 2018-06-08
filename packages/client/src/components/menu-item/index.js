import React, { Component } from 'react';
import './style.css';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  selectLine(line) {
    this.props.setFocussedItem(line.id)
  }

  renderSummary() {
    return (
      <div className='menu-item__summary-wrapper'>
        <span className='menu-item__summary'>{this.props.item.summary}</span>
        <button className='menu-item__expand' onClick={this.toggleExpand.bind(this)}>{this.state.isExpanded ? 'Less' : 'More'}</button>
      </div>
    );
  }

  renderSummaryList() {
    const summaryList = this.props.item.summaryList.map((sd, index) => {
      return (
        <div key={index} onClick={() => this.selectLine(sd)} className='menu-item__summary-list-line'>
          <span className='menu-item__summary-list-time-label'>{sd.timeLabel}</span>
          <span className='menu-item__summary-list-label'>{sd.label}</span>
          <span className='menu-item__summary-list-value'>{sd.value}</span>
        </div>
      );
    });

    return (
      <div>
        {summaryList}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='menu-item'>
          <span className='menu-item__name'>{this.props.item.name}</span>
          {!this.props.item.isConnected && 'Disconnected'}
          {this.props.item.isConnected && this.renderSummary()}
        </div>
        {this.props.item.isConnected && this.state.isExpanded && this.renderSummaryList()}
      </div>
    );
  }
}

export default MenuItem;

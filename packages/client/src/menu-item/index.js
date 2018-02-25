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

  connect() {
    this.props.onConnect(this.props.item.id);
  }

  disconnect() {
    this.props.onDisconnect(this.props.item.id);
  }

  renderConnect() {
    return (
      <div className='menu-item__summary-wrapper'>
        <button onClick={this.connect.bind(this)}>Connect</button>
      </div>
    );
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
        <div key={index} className='menu-item__summary-list-line'>
          <span className='menu-item__summary-list-time-label'>{sd.timeLabel}</span>
          <span className='menu-item__summary-list-label'>{sd.label}</span>
          <span className='menu-item__summary-list-value'>{sd.value}</span>
        </div>
      );
    });

    return (
      <div>
        {summaryList}
        <button onClick={this.disconnect.bind(this)}>Disconnect</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='menu-item'>
          <span className='menu-item__name'>{this.props.item.name}</span>
          {!this.props.item.isConnected && this.renderConnect()}
          {this.props.item.isConnected && this.renderSummary()}
        </div>
        {this.props.item.isConnected && this.state.isExpanded && this.renderSummaryList()}
      </div>
    );
  }
}

export default MenuItem;

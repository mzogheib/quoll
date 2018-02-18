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

  renderSummary = () => {
    if (this.props.item.connected) {
      return (
        <div className='menu-item__summary-wrapper'>
          <span className='menu-item__summary'>{this.props.item.data.length}</span>
          <button className='menu-item__expand' onClick={this.toggleExpand.bind(this)}>{this.state.isExpanded ? 'Less' : 'More'}</button>
        </div>
      );      
    } else {      
      return (
        <div className='menu-item__summary-wrapper'>
          <a href={this.props.item.authUrl}>Connect</a>
        </div>
      );
    }
  }

  renderDetail() {
    if (this.state.isExpanded) {
      return (
        <div>
          <div>More Detail</div>
          <a href={''}>Disconnect</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className='menu-item'>
          <span className='menu-item__name'>{this.props.item.name}</span>
          {this.renderSummary()}
        </div>
        {this.renderDetail()}
      </div>
    );
  }
}

export default MenuItem;

import React, { Component } from 'react';
import './style.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '2018-01-01',
      to: '2018-01-31'
    };
  }

  componentDidMount() {
    this.handleUpdate();
  }

  handleUpdate() {
    this.props.onUpdate({ from: this.state.from, to: this.state.to });
  }

  handleFromChange(e) {
    this.setState({
      from: e.target.value
    });
  }

  handleToChange(e) {
    this.setState({
      to: e.target.value
    });
  }

  render() {
    return (
      <div className='filter'>
        <div className='filter__input'>
          <span className='filter__input-label'>From</span>
          <input className='filter__input-text' type='text' value={this.state.from} onChange={this.handleFromChange.bind(this)}/>
        </div>
        <div className='filter__input'>
          <span className='filter__input-label'>To</span>
          <input className='filter__input-text' type='text' value={this.state.to} onChange={this.handleToChange.bind(this)}/>
        </div>
        <button onClick={this.handleUpdate.bind(this)}>Update</button>
      </div>
    );
  }
}

export default Filter;

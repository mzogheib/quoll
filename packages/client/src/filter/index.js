import React, { Component } from 'react';
import './style.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.getFormattedDate(),
    };
  }

  componentDidMount() {
    this.handleUpdate();
  }

  getFormattedDate(d = new Date()) {
    // e.g. [dd, mm, yyyy]
    const dateParts = d.toLocaleDateString().split('/');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  handleUpdate() {
    this.props.onUpdate({ from: this.state.date, to: this.state.date });
  }

  handleDateChange(e) {
    this.setState({
      date: e.target.value
    });
  }

  render() {
    return (
      <div className='filter'>
        <input type='date' value={this.state.date} onChange={this.handleDateChange.bind(this)}/>
        <button onClick={this.handleUpdate.bind(this)}>Update</button>
      </div>
    );
  }
}

export default Filter;

import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

class History extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hours: 24,
    }
  }

  componentDidMount() {
    const fullDay = moment.duration(moment().add(1, 'day').diff(moment()));
    const hours = fullDay.asHours();

    this.setState({hours: hours});
  }

  renderCircle(day, quality, time) {
    let classes = `circle ${day} ${quality}`;
    const minute = moment(time).format('mm');

    const positionStyle = {
      marginLeft: (minute/3.2) + 'px',
    };

    return (
      <div className={classes} key={time} style={positionStyle} />
    )
  }

  renderHour(hour24, hourData) {
    let hour12 = hour24 + 1;
    if (hour12 > 12) {
      hour12 -= 12;
    }

    let circles = [];

    for (let index in hourData) {
      if (Number(index - 1) === Number(hour24)) {
        for (let i in hourData[index]) {
          circles.push(this.renderCircle(hourData[index][i].day, hourData[index][i].event.quality, hourData[index][i].event.time));
        }
      }
    }

    return (
      <span className="hour" key={hour24}>
        {circles}
        {hour12}
      </span>
    );
  }

  render() {
    const { data, historyType } = this.props;
    const today = moment().format('MM-DD-YYYY');
    const yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY');

    let hours = [];
    let hourData = {};

    // Build an object that is organized by the
    // hours in which events happened
    if (Array.isArray(data[today])) {
      data[today].map(function(event) {
        let eventHour = moment(event.time).format('H');
        if (!Array.isArray(hourData[eventHour])) {
          hourData[eventHour] = [];
        }
        hourData[eventHour].push({event: event, day: 'today'});
        return true;
      });
    }

    if (Array.isArray(data[yesterday])) {
      data[yesterday].map(function(event) {
        let eventHour = moment(event.time).format('H');
        if (!Array.isArray(hourData[eventHour])) {
          hourData[eventHour] = [];
        }
        hourData[eventHour].push({event: event, day: 'yesterday'});
        return true;
      });
    }

    for (let i = 0; i < this.state.hours; i++) {
      hours.push(this.renderHour(i, hourData));
    }

    return (
      <div className="History">
        <div className={`section ${historyType}`}>
          <div>
            <h5><span className="text-muted">Yesterday</span> + Today</h5>
            <div className="hours">
              {hours}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;

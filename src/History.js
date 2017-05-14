import React, { Component } from 'react';
import moment from 'moment';

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

  calculateAverage(yesterdayData, todayData) {
    const durationBetweenEvents = []

    if (Array.isArray(yesterdayData)) {
      for (let i = 0; i < yesterdayData.length - 1; i++) {
        let current = yesterdayData[i].time;
        let next = moment(yesterdayData[i+1].time);

        let duration = moment.duration(next.diff(current));
        let hours = duration.asHours();

        durationBetweenEvents.push(hours);
      }
    }


    if (Array.isArray(todayData)) {
      for (let i = 0; i < todayData.length - 1; i++) {
        let current = todayData[i].time;
        let next = moment(todayData[i+1].time);

        let duration = moment.duration(next.diff(current));
        let hours = duration.asHours();

        durationBetweenEvents.push(hours);
      }
    }

    let sum = 0;
    for( let i = 0; i < durationBetweenEvents.length; i++ ){
        sum += parseInt( durationBetweenEvents[i], 10 );
    }

    let avg = sum/durationBetweenEvents.length;

    return avg;
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

    const eventType = historyType === 'eat' ? 'meals' : historyType + 's';
    let average = this.calculateAverage(data[yesterday], data[today]);
    average = Math.round(average * 10) / 10;

    const hoursLabel = average === 1 ? 'hour' : 'hours';

    return (
      <div className="History">
        <div className={`section ${historyType}`}>
          <div>
            <h5><span className="text-muted">Yesterday</span> + Today</h5>
            <div className="hours">
              {hours}
            </div>
            {!isNaN(average) &&
              <div className="average text-muted">
                ~{average} {hoursLabel} between {eventType}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default History;

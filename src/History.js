import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

class History extends Component {
  render() {
    const today = moment().format('MM-DD-YYYY');
    const yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY');
    const history = this.props.data;

    return (
      <div className="History">
        <div className={`section ${this.props.historyType}`}>
          <div>
            <h5><span className="text-muted">Yesterday</span> & Today</h5>
            <div style={{float: 'left'}} className="text-muted">
              {Array.isArray(history[yesterday]) && history[yesterday].map((event, index) => (
                <div key={index}>
                  {moment(event.time).format("h:mma")} was {event.quality ? 'good' : 'bad'}
                </div>
              ))}
            </div>
            <div style={{float: 'left'}}>
              {Array.isArray(history[today]) && history[today].map((event, index) => (
                <div key={index}>
                  {moment(event.time).format("h:mma")} was {event.quality ? 'good' : 'bad'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;

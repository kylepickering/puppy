import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateTimers = this.updateTimers.bind(this);
    this.handleResetTimer = this.handleResetTimer.bind(this);

    this.state = {
      lastPeeTime: null,
      lastPooTime: null,
      lastEatTime: null,
      peeTimeElapsed: null,
      pooTimeElapsed: null,
      eatTimeElapsed: null,
    };
  }

  componentDidMount() {
    if (localStorage['lastPeeTime']) {
      this.setState({
        lastPeeTime: localStorage['lastPeeTime'],
      });
    }

    if (localStorage['lastPooTime']) {
      this.setState({
        lastPooTime: localStorage['lastPooTime'],
      });
    }

    if (localStorage['lastEatTime']) {
      this.setState({
        lastEatTime: localStorage['lastEatTime'],
      });
    }

    this.timerInterval = setInterval(this.updateTimers, 1000);
  }

  updateTimers() {
    if (this.state.lastPeeTime) {
      const peeTimeElapsed = moment().utc().diff(this.state.lastPeeTime);
      this.setState({
        peeTimeElapsed: moment(peeTimeElapsed).utc(),
      });
    }

    if (this.state.lastPooTime) {
      const pooTimeElapsed = moment().utc().diff(this.state.lastPooTime);
      this.setState({
        pooTimeElapsed: moment(pooTimeElapsed).utc(),
      });
    }

    if (this.state.lastEatTime) {
      const eatTimeElapsed = moment().utc().diff(this.state.lastEatTime);
      this.setState({
        eatTimeElapsed: moment(eatTimeElapsed).utc(),
      });
    }
  }

  handleResetTimer(typeTime) {
    if (confirm('Reset the timer?')) {
      const now = moment().utc();

      if (typeTime === 'lastPeeTime') {
        this.setState({
          lastPeeTime: now,
        });
        localStorage.setItem('lastPeeTime', now);
      }

      if (typeTime === 'lastPooTime') {
        this.setState({
          lastPooTime: now,
        });
        localStorage.setItem('lastPooTime', now);
      }

      if (typeTime === 'lastEatTime') {
        this.setState({
          lastEatTime: now,
        });
        localStorage.setItem('lastEatTime', now);
      }
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="Puppy">
        <div onClick={() => this.handleResetTimer('lastPeeTime')} className="section pee">
          <span>💦 </span>
          { this.state.peeTimeElapsed &&
            this.state.peeTimeElapsed.format('HH:mm:ss')
          }
        </div>
        <div onClick={() => this.handleResetTimer('lastPooTime')} className="section poo">
          <span>💩 </span>
          { this.state.pooTimeElapsed &&
            this.state.pooTimeElapsed.format('HH:mm:ss')
          }
        </div>
        <div onClick={() => this.handleResetTimer('lastEatTime')} className="section eat">
          <span>🍜 </span>
          { this.state.eatTimeElapsed &&
            this.state.eatTimeElapsed.format('HH:mm:ss')
          }
        </div>
      </div>
    );
  }
}

export default App;

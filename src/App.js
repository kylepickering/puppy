import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateTimers = this.updateTimers.bind(this);
    this.handleResetTimer = this.handleResetTimer.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      lastPeeTime: null,
      lastPooTime: null,
      lastEatTime: null,
      peeTimeElapsed: null,
      pooTimeElapsed: null,
      eatTimeElapsed: null,
      showPeeDialog: false,
      showPooDialog: false,
      showEatDialog: false,
      peeHistory: [],
      pooHistory: null,
      eatHistory: null,
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

    if (localStorage['peeHistory']) {
      this.setState({
        peeHistory: JSON.parse(localStorage['peeHistory']),
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

  handleTimerClick(typeTime) {
    if (typeTime === 'lastPeeTime') {
      this.setState({
        showPeeDialog: true,
      });
    }

    if (typeTime === 'lastPooTime') {
      this.setState({
        showPooDialog: true,
      });
    }

    if (typeTime === 'lastEatTime') {
      this.setState({
        showEatDialog: true,
      });
    }
  }

  handleCancel() {
    this.setState({
      showPeeDialog: false,
      showPooDialog: false,
      showEatDialog: false,
    });
  }

  handleResetTimer(typeTime, quality) {
    const now = moment().utc();
    const date = moment().format('MM-DD-YYYY');

    // add history
    const newMoment = [Date.now(), quality];
    /*
    const history = {
      '11-29-81': [[199488393, true], [199488393, false]],
    };*/

    let historyArray = [];


    if (typeTime === 'lastPeeTime') {
      if (this.state.peeHistory.length > 0) {
        historyArray = JSON.parse(this.state.peeHistory);
        console.log('history', historyArray);
      }

      historyArray[date] = [];
      historyArray[date].push(newMoment);
      console.log(historyArray)

      this.setState({
        showPeeDialog: false,
        lastPeeTime: now,
        peeHistory: JSON.stringify(historyArray),
      });

      localStorage.setItem('lastPeeTime', now);
    }

    if (typeTime === 'lastPooTime') {
      this.setState({
        showPooDialog: false,
        lastPooTime: now,
      });
      localStorage.setItem('lastPooTime', now);
    }

    if (typeTime === 'lastEatTime') {
      this.setState({
        showEatDialog: false,
        lastEatTime: now,
      });
      localStorage.setItem('lastEatTime', now);
    }
  }

  render() {
    return (
      <div className="Puppy">
        {!this.state.showPeeDialog &&
          <div onClick={() => this.handleTimerClick('lastPeeTime')} className="section pee">
            <span>💦 </span>
            { this.state.peeTimeElapsed &&
              this.state.peeTimeElapsed.format('HH:mm:ss')
            }
          </div>
        }
        {this.state.showPeeDialog &&
          <div className="section pee">
            <h5>Was it a good pee?</h5>
            <div className="rating-icons">
              <span onClick={() => this.handleResetTimer('lastPeeTime', true)}>👍</span>
              <span onClick={() => this.handleResetTimer('lastPeeTime', false)}>👎</span>
            </div>
            <div>
              <a className="cancel-link" onClick={this.handleCancel}>Cancel</a>
            </div>
          </div>
        }

        {!this.state.showPooDialog &&
          <div onClick={() => this.handleTimerClick('lastPooTime')} className="section poo">
            <span>💩 </span>
            { this.state.pooTimeElapsed &&
              this.state.pooTimeElapsed.format('HH:mm:ss')
            }
          </div>
        }
        {this.state.showPooDialog &&
          <div className="section poo">
            <h5>Was it a good poo?</h5>
            <div className="rating-icons">
              <span onClick={() => this.handleResetTimer('lastPooTime', true)}>👍</span>
              <span onClick={() => this.handleResetTimer('lastPooTime', false)}>👎</span>
            </div>
            <div>
              <a className="cancel-link" onClick={this.handleCancel}>Cancel</a>
            </div>
          </div>
        }

        {!this.state.showEatDialog &&
          <div onClick={() => this.handleTimerClick('lastEatTime')} className="section eat">
            <span>🍜 </span>
            { this.state.eatTimeElapsed &&
              this.state.eatTimeElapsed.format('HH:mm:ss')
            }
          </div>
        }
        {this.state.showEatDialog &&
          <div className="section eat">
            <h5>Was it a good meal?</h5>
            <div className="rating-icons">
              <span onClick={() => this.handleResetTimer('lastEatTime', true)}>👍</span>
              <span onClick={() => this.handleResetTimer('lastEatTime', false)}>👎</span>
            </div>
            <div>
              <a className="cancel-link" onClick={this.handleCancel}>Cancel</a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;

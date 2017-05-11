import React, { Component } from 'react';
import moment from 'moment';
import SwipeableViews from 'react-swipeable-views';

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
      pooHistory: [],
      eatHistory: [],
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

    if (localStorage['pooHistory']) {
      this.setState({
        pooHistory: JSON.parse(localStorage['pooHistory']),
      });
    }

    if (localStorage['eatHistory']) {
      this.setState({
        eatHistory: JSON.parse(localStorage['eatHistory']),
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
    const yesterday = moment().subtract(1, 'day').format('MM-DD-YYYY');
    const newMoment = [Date.now(), quality];

    let historyArray = [];

    if (typeTime === 'lastPeeTime') {
      historyArray = this.state.peeHistory;

      if (Array.isArray(historyArray)) {
        if (!Array.isArray(historyArray[date])) {
          historyArray[date] = [];
        }
      } else {
        historyArray = [];
      }

      historyArray[date].push(newMoment);

      this.setState({
        showPeeDialog: false,
        lastPeeTime: now,
        peeHistory: historyArray,
      });

      localStorage.setItem('lastPeeTime', now);
      localStorage.setItem('peeHistory', JSON.stringify(historyArray));

    }

    if (typeTime === 'lastPooTime') {
      historyArray = this.state.pooHistory;

      if (Array.isArray(historyArray)) {
        if (!Array.isArray(historyArray[date])) {
          historyArray[date] = [];
        }
      } else {
        historyArray = [];
      }

      historyArray[date].push(newMoment);

      this.setState({
        showPooDialog: false,
        lastPooTime: now,
        pooHistory: historyArray,
      });

      localStorage.setItem('lastPooTime', now);
      localStorage.setItem('pooHistory', JSON.stringify(historyArray));
    }

    if (typeTime === 'lastEatTime') {
      historyArray = this.state.eatHistory;

      if (Array.isArray(historyArray)) {
        if (!Array.isArray(historyArray[date])) {
          historyArray[date] = [];
        }
      } else {
        historyArray = [];
      }

      historyArray[date].push(newMoment);

      this.setState({
        showEatDialog: false,
        lastEatTime: now,
        eatHistory: historyArray,
      });

      localStorage.setItem('lastEatTime', now);
      localStorage.setItem('eatHistory', JSON.stringify(historyArray));
    }
  }

  renderHistory(historyType) {
    let history = [];
    if (historyType === 'pee') {
      history = this.state.peeHistory;
    }

    return (
      <div className={`section ${historyType}`}>
        <div>
          <h5><span className="text-muted">Yesterday</span> & Today</h5>
          {history.map(() => (
            <div>
              Hey
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Puppy">
        <SwipeableViews>
          <div>
            {!this.state.showPeeDialog &&
              <div onClick={() => this.handleTimerClick('lastPeeTime')} className="section pee">
                <div className="section-content timer">
                  <span>💦 </span>
                  { this.state.peeTimeElapsed &&
                    this.state.peeTimeElapsed.format('HH:mm:ss')
                  }
                </div>
              </div>
            }
            {this.state.showPeeDialog &&
              <div className="section pee">
                <div className="section-content timer">
                  <h5>Was it a good pee?</h5>
                  <div className="rating-icons">
                    <span onClick={() => this.handleResetTimer('lastPeeTime', true)}>👍</span>
                    <span onClick={() => this.handleResetTimer('lastPeeTime', false)}>👎</span>
                  </div>
                  <div>
                    <a className="cancel-link" onClick={this.handleCancel}>Cancel</a>
                  </div>
                </div>
              </div>
            }
          </div>

          <div>
            {this.renderHistory('pee')}
          </div>
        </SwipeableViews>

        <SwipeableViews>
          <div>
            {!this.state.showPooDialog &&
              <div onClick={() => this.handleTimerClick('lastPooTime')} className="section poo">
                <div className="section-content timer">
                  <span>💩 </span>
                  { this.state.pooTimeElapsed &&
                    this.state.pooTimeElapsed.format('HH:mm:ss')
                  }
                </div>
              </div>
            }
            {this.state.showPooDialog &&
              <div className="section poo">
                <div className="section-content timer">
                  <h5>Was it a good poo?</h5>
                  <div className="rating-icons">
                    <span onClick={() => this.handleResetTimer('lastPooTime', true)}>👍</span>
                    <span onClick={() => this.handleResetTimer('lastPooTime', false)}>👎</span>
                  </div>
                  <div>
                    <a className="cancel-link" onClick={this.handleCancel}>Cancel</a>
                  </div>
                </div>
              </div>
            }
          </div>

          <div>
            {this.renderHistory('poo')}
          </div>
        </SwipeableViews>

        <SwipeableViews>
          <div>
            {!this.state.showEatDialog &&
              <div onClick={() => this.handleTimerClick('lastEatTime')} className="section eat">
                <div className="section-content timer">
                  <span>🍜 </span>
                  { this.state.eatTimeElapsed &&
                    this.state.eatTimeElapsed.format('HH:mm:ss')
                  }
                </div>
              </div>
            }
            {this.state.showEatDialog &&
              <div className="section eat">
                <div className="section-content timer">
                  <h5>Was it a good meal?</h5>
                  <div className="rating-icons">
                    <span onClick={() => this.handleResetTimer('lastEatTime', true)}>👍</span>
                    <span onClick={() => this.handleResetTimer('lastEatTime', false)}>👎</span>
                  </div>
                  <div>
                    <a className="cancel-link" onClick={this.handleCancel}>Cancel</a>
                  </div>
                </div>
              </div>
            }
          </div>
          <div>
            {this.renderHistory('eat')}
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default App;

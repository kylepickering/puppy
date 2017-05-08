import React, { Component } from 'react';
import moment from 'moment';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.updateTimers = this.updateTimers.bind(this);
    this.handleResetTimer = this.handleResetTimer.bind(this);
    this.showHelperText = this.showHelperText.bind(this);

    this.state = {
      lastPeeTime: null,
      lastPooTime: null,
      lastEatTime: null,
      peeTimeElapsed: null,
      pooTimeElapsed: null,
      eatTimeElapsed: null,
      peeHelperText: false,
      pooHelperText: false,
      eatHelperText: false,
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
  }

  renderHelperText() {
    return (
      <div className="smallText">👆DOUBLE TAP TO RESET TIMER👆</div>
    )
  }

  showHelperText(section) {
    if (section === 'pee') {
      this.setState({ peeHelperText: true });
      setTimeout(() => {this.setState({peeHelperText: false})}, 2000)
    }

    if (section === 'poo') {
      this.setState({ pooHelperText: true });
      setTimeout(() => {this.setState({pooHelperText: false})}, 2000)
    }

    if (section === 'eat') {
      this.setState({ eatHelperText: true });
      setTimeout(() => {this.setState({eatHelperText: false})}, 2000)
    }
  }

  render() {
    return (
      <div className="Puppy">
        <div
          onClick={() => this.showHelperText('pee')}
          onDoubleClick={() => this.handleResetTimer('lastPeeTime')}
          className="section pee"
        >
          <span>💦 </span>
          { this.state.peeTimeElapsed &&
            this.state.peeTimeElapsed.format('HH:mm:ss')
          }
          {this.state.peeHelperText &&
            this.renderHelperText()
          }
        </div>
        <div
          onClick={() => this.showHelperText('poo')}
          onDoubleClick={() => this.handleResetTimer('lastPooTime')}
          className="section poo"
        >
          <span>💩 </span>
          { this.state.pooTimeElapsed &&
            this.state.pooTimeElapsed.format('HH:mm:ss')
          }
          {this.state.pooHelperText &&
            this.renderHelperText()
          }
        </div>
        <div
          onClick={() => this.showHelperText('eat')}
          onDoubleClick={() => this.handleResetTimer('lastEatTime')}
          className="section eat"
        >
          <span>🍜 </span>
          { this.state.eatTimeElapsed &&
            this.state.eatTimeElapsed.format('HH:mm:ss')
          }
          {this.state.eatHelperText &&
            this.renderHelperText()
          }
        </div>
      </div>
    );
  }
}

export default App;

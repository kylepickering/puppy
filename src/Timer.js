import React, { Component } from 'react';

class Timer extends Component {

  render() {
    const { type, icon, timeElapsed, onPress } = this.props;

    return (
      <div className="Timer">
        <div onClick={onPress} className={`section ${type}`}>
          <div className="section-content timer">
            <span>{icon} </span>
            { timeElapsed &&
              timeElapsed.format('HH:mm:ss')
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;

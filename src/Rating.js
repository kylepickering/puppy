import React, { Component } from 'react';
import moment from 'moment';

class Rating extends Component {

  render() {
    const { type, typeLabel, onGood, onBad, onCancel } = this.props;

    let label = type;
    if (typeLabel) {
      label = typeLabel;
    }

    return (
      <div className="Rating">
        <div className={`section ${type}`}>
          <div className="section-content timer">
            <h5>Was it a good {label}?</h5>
            <div className="rating-icons">
              <span onClick={onGood}>👍</span>
              <span onClick={onBad}>👎</span>
            </div>
            <div>
              <a className="cancel-link" onClick={onCancel}>Cancel</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rating;

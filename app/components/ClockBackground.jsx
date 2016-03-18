import React, { PropTypes } from 'react';
import ClockMarks from './ClockMarks';

const ClockBackground = ({clockRadius=75}) => (
  <g>
    <use xlinkHref='#clockBorder' />
    <ClockMarks clockRadius={clockRadius} />
  </g>
);

ClockBackground.PropTypes = {
    clockRadius: PropTypes.number.isRequired
}

export default ClockBackground;

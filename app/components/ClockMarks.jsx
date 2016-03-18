import React, { PropTypes } from 'react';

const ClockMarks = ({clockRadius}) => (
    <use key="1" xlinkHref='#hourMark' />
);

ClockMarks.PropTypes = {
    clockRadius: PropTypes.number.isRequired
}

export default ClockMarks;

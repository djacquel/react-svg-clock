import React, { PropTypes } from 'react';

const ClockDefs = ({clockRadius=75}) => (
  <defs>
      <circle r={clockRadius} cy={clockRadius} cx={clockRadius} id="clockBorder" className="background" />
      <circle r="1" cy={clockRadius} cx={clockRadius} id="clockCenter" className="center" />
      <rect x={clockRadius-1} y="2" rx="2" ry="1" height="15" width="3" id="hourMark" className="mark hourMark" />
      <rect x={clockRadius-1} y="2" rx="1" ry="1" height="10" width="2" id="quarterMark" className="mark quarterMark" />
      <rect x={clockRadius-1} y="2" rx="1" ry="1" height="5" width="2" id="mark" className="mark" />
      <rect x={clockRadius-5} y="25" rx="5" ry="5" height={clockRadius-20} width="10" id="hourPointer" className="hourPointer" />
      <rect x={clockRadius-5} y="5" rx="5" ry="5" height={clockRadius} width="10" id="minPointer" className="minPointer" />
      <rect x={clockRadius-2} y="5" rx="5" ry="5" height={clockRadius-20} width="4" id="secPointer" className="secPointer" />
  </defs>

);

ClockDefs.PropTypes = {
    clockRadius: PropTypes.number.isRequired
}

export default ClockDefs;

import React, { PropTypes } from "react";

const ClockDefs = ({clockRadius=75}) => (
  <defs>
      <circle r={clockRadius} cy={clockRadius} cx={clockRadius} id="clockBorder" className="background" />
      <circle r="1" cy={clockRadius} cx={clockRadius} id="clockCenter" className="center" />

      <g className="mark quarterMark" id="hourMark">
        <rect x={clockRadius-2} y="1" rx="0" ry="0" height="6" width="4" className="outer" />
        <rect x={clockRadius-1} y="2" rx="0" ry="0" height="4" width="2" className="inner" />
      </g>

      <g className="mark quarterMark" id="quarterMark">
        <rect x={clockRadius-2} y="1" rx="0" ry="0" height="16" width="4" className="outer" />
        <rect x={clockRadius-1} y="2" rx="0" ry="0" height="14" width="2" className="inner" />
      </g>

      <rect x={clockRadius-1} y="2" rx="0" ry="0" height="2" width="2" id="mark" className="mark" />

      <g id="hourPointer" className="hourPointer">
        <rect x={clockRadius-2} y="25" rx="0" ry="0" height={clockRadius-20} width="4" className="outer" />
      </g>
      <g id="minPointer" className="minPointer">
        <rect x={clockRadius-2} y="5" rx="0" ry="0" height={clockRadius} width="4" className="outer" />
      </g>
      <g id="secPointer" className="secPointer">
        <rect x={clockRadius-1} y="3" rx="0" ry="0" height={clockRadius} width="2" />
        <circle r="5" cy="15" cx={clockRadius} />
      </g>
  </defs>

);

ClockDefs.PropTypes = {
  clockRadius: PropTypes.number.isRequired,
}

export default ClockDefs;

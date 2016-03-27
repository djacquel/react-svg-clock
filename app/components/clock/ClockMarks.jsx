import React, { PropTypes } from "react";

const ClockMarks = ({clockRadius}) => {

  var secStart = 1;
  var secEnd = 60;
  var marks = [];
  var r = clockRadius;

  for (var i = secStart; i <= secEnd; i++) {
    var markType = i%5 === 0 ? (i%15 === 0 ? "quarterMark" : "hourMark") : "mark";
    var rotation = i * 6;
    marks.push(
        <use key={i}
          xlinkHref={"#" + markType}
          transform={"rotate(" + rotation + " " + r + " " + r + ")"} />
        );
  }

  return (
        <g>{marks}</g>
    );
}

ClockMarks.PropTypes = {
  clockRadius: PropTypes.number.isRequired,
}

export default ClockMarks;

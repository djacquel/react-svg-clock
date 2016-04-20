import React, { PropTypes } from "react";

const ClockMarks = ({clockRadius}) => {

  const secStart = 1;
  const secEnd = 60;
  const marks = [];
  const r = clockRadius;

  let markType;
  let rotation;

  for (let i = secStart; i <= secEnd; i++) {
    markType = i%5 === 0 ? (i%15 === 0 ? "quarterMark" : "hourMark") : "mark";
    // markType = i%5 === 0 ? (i%15 === 0 ? "quarterMark" : "hourMark") : "NONE";
    rotation = i * 6;

    if (markType !== "NONE") {
      marks.push(
          <use key={i}
            xlinkHref={"#" + markType}
            transform={"rotate(" + rotation + " " + r + " " + r + ")"} />
          );
    }

  }

  return (
        <g>{marks}</g>
    );
}

ClockMarks.PropTypes = {
  clockRadius: PropTypes.number.isRequired,
}

export default ClockMarks;

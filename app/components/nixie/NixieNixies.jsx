import React, { PropTypes } from "react";
import Nixie from "./Nixie";
import NixieSeparator from "./NixieSeparator";
import Utils from "../../libs/Utils";

const NixieNixies = ({clockWidth, newRemainTs}) => {

  const nixieOriginalWidth = 50;
  const separatorOriginalWidth = 14;
  const originalClockWidth = 7*nixieOriginalWidth + 3*separatorOriginalWidth;
  const scaling = (clockWidth/originalClockWidth).toFixed(2);
  const nixieWidth = nixieOriginalWidth * scaling;
  const separatorWidth = separatorOriginalWidth * scaling;

  let elementPositionX = 0;

    // get HH:MM:SS:T string
  const timeStr = Utils.getTimeString(newRemainTs);

  let nixiesArr = [];

  let code
  let elementIndex

  for (let i = 0; i < timeStr.length; i++) {
    code = timeStr.charAt(i);
    elementIndex = i+1;

    if ( isNaN(code) ) {
      nixiesArr.push(<NixieSeparator key={elementIndex} elementPositionX={elementPositionX} scaling={scaling} />);
      elementPositionX += separatorWidth;
    } else {
      nixiesArr.push(<Nixie key={elementIndex} digit={code} elementPositionX={elementPositionX} scaling={scaling} />);
      elementPositionX += nixieWidth;
    }
  }

  return (
        <g className="nixies">
            {nixiesArr}
        </g>
    );
}

NixieNixies.PropTypes = {
  clockWidth: PropTypes.number.isRequired,
  newRemainTs: PropTypes.number.isRequired,
}

export default NixieNixies;

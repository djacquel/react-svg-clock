import React, { PropTypes } from "react";
import Utils from "../../libs/Utils";

const ClockPointer = ({type, timeTs, clockRadius}) => {

  const rotation = Utils.getRotation( timeTs, type );

  return (
        <use xlinkHref={"#" + type + "Pointer"}
          transform={"rotate(" + rotation + " " + clockRadius + " " + clockRadius + ")"} />
  )
}

ClockPointer.PropTypes = {
  type: PropTypes.string.isRequired,
  timeTs: PropTypes.number.isRequired,
  clockRadius: PropTypes.number.isRequired,
}

export default ClockPointer;

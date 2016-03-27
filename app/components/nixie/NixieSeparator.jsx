import React, { PropTypes } from "react";

const NixieSeparator = ({key, elementPositionX, scaling}) => (
    <g className="separator" key={key} transform={"translate("+elementPositionX+") scale("+scaling+")"}>
        <use xlinkHref="#separator" />
    </g>
)

NixieSeparator.PropTypes = {
  nixieId: PropTypes.number.isRequired,
  elementPositionX: PropTypes.number.isRequired,
}

export default NixieSeparator;

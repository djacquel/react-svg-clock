import React, { PropTypes } from "react";

const ClockButton = ({text, onClick, className, clockRadius, order}) => {

  const yButton = clockRadius*2 + 10 + 30*(order-1);
  const ytext = yButton + 15;

  return (
        <g className="buttonGroup" onClick={onClick} >
            <rect x="0" y={yButton} width={clockRadius*2} rx="5" height="20" className={"button " + className} />
            <text x={clockRadius} textAnchor="middle" y={ytext} className="buttonText" children={text} />
        </g>
    );
}

ClockButton.PropTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  clockRadius: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
}

export default ClockButton;

import React, { PropTypes } from 'react';

const ClockButton = ({text, onClick, className, clockRadius, order}) => {

    var yButton = clockRadius*2 + 10 + 30*(order-1);
    var ytext = yButton + 15;

    return (
        <g className='buttonGroup' onClick={onClick} >
            <rect x='0' y={yButton} width={clockRadius*2} rx="5" height='20' className={"button " + className} />
            <text x={clockRadius} textAnchor='middle' y={ytext} className="buttonText" children={text} />
        </g>
    );
}

ClockButton.PropTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
    order: React.PropTypes.number.isRequired
}

export default ClockButton;

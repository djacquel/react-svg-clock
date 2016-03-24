import React, { PropTypes } from 'react';

const NixieButton = ({text, onClick, className, clockWith, order}) => {

    var yButton = 110 + 50*(order-1);
    var ytext = yButton + 25;

    return (
        <g className='buttonGroup' onClick={onClick} >
            <rect x='0' y={yButton} width={clockWith} height='40' className={"button " + className} />
            <text x={clockWith/2} textAnchor='middle' y={ytext} className="buttonText" children={text} />
        </g>
    );
}

NixieButton.PropTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
    order: React.PropTypes.number.isRequired
}

export default NixieButton;

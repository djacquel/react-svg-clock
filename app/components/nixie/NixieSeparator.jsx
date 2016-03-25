import React, { PropTypes } from 'react';

const NixieSeparator = ({key, elementPositionX}) => (
    <g key={key} transform={"translate("+elementPositionX+")"}>
        <use xlinkHref='#separator' />
    </g>
)

NixieSeparator.PropTypes = {
    nixieId: PropTypes.number.isRequired,
    elementPositionX: PropTypes.number.isRequired
}

export default NixieSeparator;

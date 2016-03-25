import React, { PropTypes } from 'react';

const NixieSeparator = ({nixieId, elementPositionX}) => (
    <g key={nixieId} transform={"translate("+elementPositionX+")"}>
        <use xlinkHref='#separator' />
    </g>
)

NixieSeparator.PropTypes = {
    nixieId: PropTypes.string.isRequired,
    elementPositionX: PropTypes.number.isRequired
}

export default NixieSeparator;

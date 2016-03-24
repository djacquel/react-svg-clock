import React, { PropTypes } from 'react';

const NixieBackground = ({clockWidth}) => (
  <g>
    <rect x="0" y="0" height="100" width={clockWidth} className="nixieBackground" />
  </g>
);

NixieBackground.PropTypes = {
    clockWidth: PropTypes.number.isRequired
}

export default NixieBackground;

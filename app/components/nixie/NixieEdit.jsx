import React, { PropTypes } from 'react';

const NixieEdit = ({remainTs}) => (
    <text>{ remainTs }</text>
);

NixieEdit.PropTypes = {
    remainTs: PropTypes.number.isRequired
}

export default NixieEdit;

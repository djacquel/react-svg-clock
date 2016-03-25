import React, { PropTypes } from 'react';
import Utils from '../../libs/Utils'

const ClockPointer = ({type, timeTs, clockRadius}) => {

    var rotation = Utils.getRotation( timeTs, type );

    return(
        <use xlinkHref={'#' + type + 'Pointer'}
           transform={'rotate(' + rotation + ' ' + clockRadius + ' ' + clockRadius + ')'} />
    );
}

ClockPointer.PropTypes = {
    type: React.PropTypes.oneOf(['hour', 'min', 'sec']),
    timeTs: React.PropTypes.number.isRequired,
    clockRadius: React.PropTypes.number.isRequired
}

export default ClockPointer;

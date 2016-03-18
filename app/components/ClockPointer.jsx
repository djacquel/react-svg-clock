import React, { PropTypes } from 'react';
import Utils from './../libs/Utils'

const ClockPointer = ({type, time, clockRadius}) => {

    console.log ("ClockPointer : received time " + time.getDate() );

    var rotation = Utils.getRotation( time, type );
    return(
        <use xlinkHref={'#' + type + 'Pointer'}
           transform={'rotate(' + rotation + ' ' + clockRadius + ' ' + clockRadius + ')'} />
    );
}

ClockPointer.PropTypes = {
    type: React.PropTypes.oneOf(['hour', 'min', 'sec']),
    time: React.PropTypes.object.isRequired,
    clockRadius: React.PropTypes.number.isRequired
}

export default ClockPointer;

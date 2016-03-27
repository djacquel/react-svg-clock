import React, { PropTypes } from 'react';
import Nixie from './Nixie';
import NixieSeparator from './NixieSeparator';
import Utils from '../../libs/Utils';

const NixieNixies = ({clockWidth, newRemainTs}) => {

    var nixieWith      = 50;
    var separatorWidth = 10;
    var gutter         = 0;
    var elementPositionX = 0;

    // get HH:MM:SS string
    var timeStr = Utils.getTimeString(newRemainTs);
    // console.log("NixieNixies : timeStr = " + timeStr);

    var nixiesArr = [];

    for (var i = 0; i < timeStr.length; i++) {
        var code = timeStr.charAt(i);
        var type;
        var elementIndex = i+1;
        var elementKey;
        // console.log(i + "= " + code + " (elementIndex = " + elementIndex + ")");

        if ( isNaN(code) ) {
            nixiesArr.push(<NixieSeparator key={elementIndex} elementPositionX={elementPositionX} />);
            elementPositionX += (gutter*2 + separatorWidth);
        } else {
            nixiesArr.push(<Nixie key={elementIndex} digit={code} elementPositionX={elementPositionX} />);
            elementPositionX += nixieWith;
            if (elementIndex % 3 == 2) {
                elementPositionX += gutter;
            }
        }
    }

    return (
        <g className="nixies">
            {nixiesArr}
        </g>
    );
}

NixieNixies.PropTypes = {
    clockWidth: PropTypes.number.isRequired,
    withTenth: PropTypes.bool.isRequired,
    newRemainTs: PropTypes.number.isRequired
}

export default NixieNixies;

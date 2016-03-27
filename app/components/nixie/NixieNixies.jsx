import React, { PropTypes } from 'react';
import Nixie from './Nixie';
import NixieSeparator from './NixieSeparator';
import Utils from '../../libs/Utils';

const NixieNixies = ({clockWidth, newRemainTs}) => {

    var nixieOriginalWidth = 50;
    var separatorOriginalWidth = 14;
    var originalClockWidth = 7*nixieOriginalWidth + 3*separatorOriginalWidth;
    var scaling = (clockWidth/originalClockWidth).toFixed(2);
    var nixieWidth = nixieOriginalWidth * scaling;
    var separatorWidth = separatorOriginalWidth * scaling;

    var elementPositionX = 0;

    // get HH:MM:SS:T string
    var timeStr = Utils.getTimeString(newRemainTs);

    var nixiesArr = [];

    for (var i = 0; i < timeStr.length; i++) {
        var code = timeStr.charAt(i);
        var type;
        var elementIndex = i+1;
        var elementKey;

        if ( isNaN(code) ) {
            nixiesArr.push(<NixieSeparator key={elementIndex} elementPositionX={elementPositionX} scaling={scaling} />);
            elementPositionX += separatorWidth;
        } else {
            nixiesArr.push(<Nixie key={elementIndex} digit={code} elementPositionX={elementPositionX} scaling={scaling} />);
            elementPositionX += nixieWidth;
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
    newRemainTs: PropTypes.number.isRequired
}

export default NixieNixies;

import React, { PropTypes } from 'react';
import Nixie from './Nixie';
import NixieSeparator from './NixieSeparator';
import Utils from '../../libs/Utils';

const NixieNixies = ({clockWidth, newRemainTs}) => {

    console.log("clockWidth " + clockWidth);

    var nixieOriginalWidth = 50;
    var separatorOriginalWidth = 14;

    var originalClockWidth = 7*nixieOriginalWidth + 3*separatorOriginalWidth;

    console.log("originalClockWidth " + originalClockWidth );

    var scaling = (clockWidth/originalClockWidth).toFixed(2);
    console.log("scaling " + scaling );

    var nixieWidth = nixieOriginalWidth * scaling;
    console.log("nixieWidth " + nixieWidth );

    var separatorWidth = separatorOriginalWidth * scaling;
    console.log("separatorWidth " + separatorWidth );

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
        console.log(i + "= " + code + " (elementPositionX = " + elementPositionX + ")");

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

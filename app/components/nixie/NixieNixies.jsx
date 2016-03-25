import React, { PropTypes } from 'react';
import Nixie from './Nixie';
import NixieSeparator from './NixieSeparator';

const NixieNixies = ({clockWidth, withTenth, newRemainTs}) => {

    console.log("NixieNixies received newRemainTs = " + newRemainTs);

    var time    = new Date(newRemainTs);
    var nixieWith = 50;
    var separatorWidth = 10;
    var gutter = 0;
    var elementPositionX = 0;

    // get HH:MM:SS
    // see http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss/12612778#12612778
    // not sure it's the best
    var timeStr = time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

    if (withTenth == true) {
        var millisec = time.getMilliseconds();
        var tenth    = millisec/10;
        var tenthStr = tenth < 10 ? "0" + tenth : tenth;
        timeStr = timeStr + ":" + tenthStr;
    }

//    timeStr = "12:34:56:78";

    console.log("NixieNixies : timeStr = " + timeStr);

    var nixies = [];

    for (var i = 0; i < timeStr.length; i++) {
        var code = timeStr.charAt(i);
        var type;
        var elementIndex = i+1;
        var elementKey;
        // console.log("Char " + code + " at pos " + i + " (elementIndex = " + elementIndex + ")");

        if ( isNaN(code) ) {
            // console.log("before separator elementPositionX = " + elementPositionX);
            elementKey = "separator" + elementIndex;
            nixies.push(<NixieSeparator nixieId={elementKey} elementPositionX={elementPositionX} />);
            elementPositionX += (gutter*2 + separatorWidth);
        } else {
            // console.log("before nixie elementPositionX = " + elementPositionX);
            elementKey = "nixie" + elementIndex;
            nixies.push(<Nixie nixieId={elementKey} digit={code} elementPositionX={elementPositionX} />);
            elementPositionX += nixieWith;
            if (elementIndex % 3 == 2) {
                elementPositionX += gutter;
            }else{
                //elementPositionX += nixieWith;
            }
        }
    }

    return (
        <g className="nixies">
            {nixies}
        </g>
    );
}

NixieNixies.PropTypes = {
    clockWidth: PropTypes.number.isRequired,
    withTenth: PropTypes.bool.isRequired,
    newRemainTs: PropTypes.number.isRequired
}


export default NixieNixies;

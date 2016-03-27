import React, { PropTypes } from "react";

const ClockLaps = ({laps}) => {

  return (
        <ul>
        {laps.map( lap => {

          var d = new Date(lap.ts);
          var tenth = d.getMilliseconds() / 100;
          var dStr = ("0" + d.getHours()).slice(-2) + ":"
                    + ("0" + d.getMinutes()).slice(-2) + ":"
                    + ("0" + d.getSeconds()).slice(-2) + ":"
                    + (Math.round(tenth));
          return (
                <li key={lap.id}>{lap.id} - {dStr}</li>
            )
        })}
        </ul>
    )
}

ClockLaps.PropTypes = {
  laps: PropTypes.array.isRequired,
}

export default ClockLaps;

import React, { PropTypes } from "react";

const Nixie = ({nixieId, digit, elementPositionX, scaling}) => {

    // digit order - cf https://en.wikipedia.org/wiki/Nixie_tube#Design
    // var mixiePattern = [6, 7, 5, 8, 4, 3, 9, 2, 0, 1];
  var mixiePattern = [6, 7, 5, 8, 4, 3, 9, 2, 0, 1];
  var digits = [];

  mixiePattern.forEach(
        (d, index) => {
          var defId = "#d" + d;
          var digitId = nixieId + "digit" + index;
          var elClass = "digit";
          if (d === Number(digit)) {
            elClass += " glowing";
          }
          digits.push(<use xlinkHref={defId} className={elClass} key={digitId}/>);
        }
    );

  return (
        <g className="nixie" key={nixieId} transform={"translate("+elementPositionX+") scale("+scaling+")"}>
            {digits}
            <use xlinkHref="#grid" />
        </g>
  )

}

Nixie.PropTypes = {
  id: PropTypes.string.isRequired,
  digit: PropTypes.string.isRequired,
  elementPositionX: PropTypes.number.isRequired,
  nixieWith: PropTypes.number.isRequired,
}

export default Nixie;


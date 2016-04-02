import React, { PropTypes } from "react";

const Nixie = ({nixieId, digit, elementPositionX, scaling}) => {

    // digit order - cf https://en.wikipedia.org/wiki/Nixie_tube#Design
    // var mixiePattern = [6, 7, 5, 8, 4, 3, 9, 2, 0, 1];
  const mixiePattern = [6, 7, 5, 8, 4, 3, 9, 2, 0, 1];
  let digits = [];

  mixiePattern.forEach(
        (d, index) => {
          let defId = "#d" + d;
          let digitId = nixieId + "digit" + index;
          let elClass = "digit";
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


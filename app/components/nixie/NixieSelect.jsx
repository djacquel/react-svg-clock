import React, { PropTypes } from "react";
import Utils from "../../libs/Utils";

const NixieSelect = ({groupName, index, remainTs, onChange}) => {

    // creates a time array [ "12", "34", "56" ] representing hour, min and sec
  const timeStr = Utils.getTimeString(remainTs, false).split(":");

    // get the current value for the group
    // use the passed index
  const currentValue = timeStr[index];
  const optionsEnd = groupName === "hour" ? 23 : 59;
  const options = [];

    // creates list of options for the group
  for (let i = 0; i <= optionsEnd; i++) {
    let text = i < 10 ? "0"+i : ""+i; // ""+i casts i to a string
    options.push(
            <option value={text} key={i}>{text}</option>
        );
  }

  return (
    <label>&nbsp;{groupName}&nbsp;
      <select value={currentValue} onChange={onChange} key={index} id={groupName}>
          {options}
      </select>
    </label>
  )
}

NixieSelect.PropTypes = {
  groupName: PropTypes.oneOf(["hour", "min", "sec"]),
  index: PropTypes.string.isRequired,
  remainTs: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NixieSelect;


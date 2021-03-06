import React, { PropTypes } from "react";
import NixieSelect from "./NixieSelect";

const NixieEdit = ({remainTs, onChange, onSave}) => {

  const groups = ["hour", "min", "sec"];
  let selects = [];

    // creates select for each group
  groups.forEach(
        (groupName, index) => {
          selects.push(<NixieSelect groupName={groupName} index={index} remainTs={remainTs} onChange={onChange} key={index}/>);
        }
    )

  return (
        <form>
            {selects}
            <button type="submit" onClick={onSave}>Save</button>
        </form>
    )
}

NixieEdit.PropTypes = {
  remainTs: PropTypes.number.isRequired,
}

export default NixieEdit;

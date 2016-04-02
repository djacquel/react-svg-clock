import React from "react";
import { browserHistory } from "react-router";

import NixieDefs from "./nixie/NixieDefs";
import NixieNixies from "./nixie/NixieNixies";
import NixieEdit from "./nixie/NixieEdit";
import NixieButton from "./nixie/NixieButton";
import Utils from "../libs/Utils";

export default class Countdown extends React.Component {

  static defaultProps = {
    svgWidth: 450,
    svgHeight: 250,
    tickInterval: 100,
  }

  static propTypes = {
    svgWidth: React.PropTypes.number,
    svgHeight: React.PropTypes.number,
  }

  // keep track of setInterval in order to clearInterval
  tickerId;

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  render() {
    const p = this.props;
    const newRemainTs = this.state.newRemainTs;
    const viewBox = "0 0 " + p.svgWidth + " " + p.svgHeight;
    const clockWith = p.svgWidth;

    return (
    <div>
      { this.state.isEditing ?
          <NixieEdit remainTs={this.state.remainTs} onChange={this.editTime} onSave={this.setSaveTime} clockWith={clockWith} order="1" />
          :
          null
      }
      <svg viewBox={viewBox} className="countdown">
        <g id="clock">
          <NixieDefs />
          <NixieNixies clockWidth={clockWith} newRemainTs={newRemainTs} />
          { this.state.isEditing ?
              null
              :
              <NixieButton text={this.state.isStarted === false ? "Start":"Stop"} onClick={this.startStop} className={this.state.isStarted === false ? "start":"stop"} clockWith={clockWith} order="1" />
          }
          <NixieButton text={this.state.isEditing === false ? "Set time":"Save time"} onClick={this.setSaveTime} clockWith={clockWith} order="2" />
        </g>
      </svg>
    </div>
    );
  }

  startStop = () => {
    if ( this.state.isStarted === false ) {
      this._start();
    } else if ( this.state.isStarted === true ) {
      this._stop();
    }
  }

  _start = () => {
    const start = new Date();
    const startTs = start.getTime();
    this.setState({
      isStarted: true,
      startTs: startTs,
    });

    // start ticking
    this.tickerId = setInterval(
      this.tick,
      this.props.tickInterval
    );
  }

  _stop = () => {
    this.setState({
      isStarted: false,
      remainTs: this.state.newRemainTs,
    });
    clearInterval(this.tickerId);
  }

  setSaveTime = (event) => {
    event.preventDefault();
    if ( this.state.isEditing === false ) {
      this._setTime();
    } else if ( this.state.isEditing === true ) {
      this._saveTime();
    }
  }

  _setTime = () => {
    this._stop();
    this.setState({
      isEditing: true,
    });
  }

  _saveTime = () => {
    this.setState({
      isEditing: false,
    });
    const currentTimeStr = Utils.getTimeString(this.state.remainTs);
    const [h, m, s] = currentTimeStr.split(":");
    const path = "/countdown/"+Number(h)+"/"+Number(m)+"/"+Number(s);
    browserHistory.push(path);
  }

  editTime = (event) => {
    const editingGroup = event.target.id;
    const newValue = event.target.value
    const currentTimeStr = Utils.getTimeString(this.state.remainTs);
    let [h, m, s] = currentTimeStr.split(":");
    switch (editingGroup) {
      case "hour":
        h = newValue;
        break;
      case "min":
        m = newValue;
        break;
      case "sec":
        s = newValue;
        break;
    }

    const newTs = Utils.getTimeStamp( h, m, s, 0 );

    this.setState({
      remainTs : newTs,
      newRemainTs: newTs,
    });

  }

  tick = () => {
    const s = this.state;
    const now = new Date();
    const elapsed = now.getTime() - s.startTs;
    const newRemainTs = s.remainTs - elapsed;

    // check if we reached zero time
    if ( newRemainTs <= s.zeroTs ) {
      this._stop();
      const t = this.state.zeroTs;
      this.setState({
        remainTs: t,
        newRemainTs: t,
      });
      this._beep();
    } else {
      this.setState({newRemainTs: newRemainTs});
    }
  }

  _beep = () => {
    Utils.beep();
  }

  // not getInitialState but _getInitialState
  // because we are not suposed to set a getInitialState method on a plain js class
  _getInitialState = () => {

    const zeroTs = Utils.getTimeStamp(0,0,0);

      // this.props.params are from url (see router)
    const startHour = this.props.params.hour ? this.props.params.hour : 0;
    const startMin = this.props.params.min ? this.props.params.min : 0;
    const startSec = this.props.params.sec ? this.props.params.sec : 0;

    const startTs = Utils.getTimeStamp(startHour,startMin,startSec);

    const initialState = {
      isStarted: false,
      isEditing: false,
      zeroTs: zeroTs,
      remainTs: startTs,
      newRemainTs: startTs,
    }

    return initialState;
  }

}

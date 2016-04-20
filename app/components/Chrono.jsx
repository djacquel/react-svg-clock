import React from "react";
import ChronoDefs from "./clock/ChronoDefs";
import ClockBackground from "./clock/ClockBackground";
import ClockPointer from "./clock/ClockPointer";
import ClockButton from "./clock/ClockButton";
import ClockLaps from "./clock/ClockLaps";

export default class Chrono extends React.Component {

  static defaultProps = {
    svgWidth: 200,
    svgHeight: 300,
    clockRadius: 75,
  }

  static propTypes = {
    svgWidth: React.PropTypes.number.isRequired,
    svgHeight: React.PropTypes.number.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
  }

  TICK = 1000;

  // keep track of setInterval in order to clearInterval
  tickerId;

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  render() {
    const p = this.props;
    const timeTs = this.state.newTimeTs;

    const viewBox = "0 0 " + p.svgWidth + " " + p.svgHeight;
    const clockDiameter = p.clockRadius * 2;
    const centerOffset = (p.svgWidth - clockDiameter)/2;

    return (
    <div>
      <svg viewBox={viewBox} className="chrono">
        <g id="clock" transform={"translate(" + centerOffset + "," + centerOffset + ")"}>
          <ChronoDefs clockRadius={p.clockRadius} />
          <ClockBackground clockRadius={p.clockRadius} />
          <ClockPointer type="hour" timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type="min" timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type="sec" timeTs={timeTs} clockRadius={p.clockRadius} />
          <use xlinkHref="#clockCenter" />
          <ClockButton text={this.state.isStarted === false ? "Start":"Stop"} onClick={this.startStop} className={this.state.isStarted === false ? "start":"stop"} clockRadius={p.clockRadius} order="1" />
          <ClockButton text={this.state.isStarted === true ? "Lap":"Reset"} onClick={this.lapReset} clockRadius={p.clockRadius} order="2" />
          <ClockLaps laps={this.state.laps} />
        </g>
      </svg>
    </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.tickerId);
  }

  startStop = () => {
    if ( this.state.isStarted === false ) {
      const start = new Date();
      const startTs = start.getTime();
      this.setState({
        isStarted: !this.state.isStarted,
        startTs: startTs,
      });
      this.tickerId = setInterval(
        this.tick,
        this.TICK
      );
    } else if ( this.state.isStarted === true ) {
      this.setState({
        isStarted: !this.state.isStarted,
        timeTs: this.state.newTimeTs,
      });
      clearInterval(this.tickerId);
    }
  }

  lapReset = () => {
    let lapNumber
    if ( this.state.isStarted === false ) {
      this.reset();
    } else if ( this.state.isStarted === true ) {
      lapNumber = this.state.laps.length;
      this.setState({
        laps: this.state.laps.concat([{
          id: ++lapNumber,
          ts: this.state.newTimeTs,
        }]),
      });
    }
  }

  tick = () => {
    const timeTs = this.state.timeTs;
    const startTs = this.state.startTs;
    const now = new Date();
    const nowTs = now.getTime();
    const elapsed = nowTs - startTs;
    const newTimeTs = timeTs + elapsed;
    this.setState({newTimeTs: newTimeTs});
  }

 // not getInitialState but _getInitialState
 // because we are not suposed to set a getInitialState method on a plain js class
  _getInitialState = () => {
    // building a 00:00:00 date
    const zero = new Date(1970, 1, 1, 0, 0, 0, 0);
    const zeroTs = zero.getTime()
    const initialState = {
      isStarted: false,
      laps: [],
      timeTs: zeroTs,
      newTimeTs: zeroTs,
    }
    return initialState;
  }

  reset = () => {
    this.setState( this._getInitialState() );
  }

}

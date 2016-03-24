import React from 'react';
import TopMenu from './TopMenu';
import ClockDefs from './ClockDefs';
import ClockBackground from './ClockBackground';
import ClockPointer from './ClockPointer';
import ClockButton from './ClockButton';
import ClockLaps from './ClockLaps';

export default class Chrono extends React.Component {

  static defaultProps = { svgWidth: 200, svgHeight: 280, clockRadius: 75 }

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
    var p = this.props;
    var timeTs = this.state.newTimeTs;

    var viewBox = '0 0 ' + p.svgWidth + ' ' + p.svgHeight;
    var clockDiameter = p.clockRadius * 2;
    var centerOffset = (p.svgWidth - clockDiameter)/2;

    return (
    <div>
      <TopMenu />
      <h2>Chrono</h2>
      <svg viewBox={viewBox} className="clock">
        <g id="clock" transform={'translate(' + centerOffset + ',' + centerOffset + ')'}>
          <ClockDefs clockRadius={p.clockRadius} />
          <ClockBackground clockRadius={p.clockRadius} />
          <ClockPointer type='hour' timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type='min' timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type='sec' timeTs={timeTs} clockRadius={p.clockRadius} />
          <use xlinkHref='#clockCenter' />
          <ClockButton text={this.state.isStarted == false ? 'Start':'Stop'} onClick={this.startStop} className={this.state.isStarted == false ? 'start':'stop'} clockRadius={p.clockRadius} order='1' />
          <ClockButton text={this.state.isStarted == true ? 'Lap':'Reset'} onClick={this.lapReset} clockRadius={p.clockRadius} order='2' />
          <ClockLaps laps={this.state.laps} />
        </g>
      </svg>
    </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.tickerId);
  }

  startStop = (event) => {
    if ( this.state.isStarted == false ){
      var start = new Date();
      var startTs = start.getTime();
      this.setState({
        isStarted: !this.state.isStarted,
        startTs: startTs
      });
      this.tickerId = setInterval(
        this.tick,
        this.TICK
      );
    }else if( this.state.isStarted == true ){
      this.setState({
        isStarted: !this.state.isStarted,
        timeTs: this.state.newTimeTs
      });
      clearInterval(this.tickerId);
    }
  }

  setTime = (event) => {
    console.log('setTime');
  }

  lapReset = (event) => {
    if ( this.state.isStarted == false ){
      console.log("RESET");
      this.reset();
    }else if( this.state.isStarted == true ){
      console.log("LAP");
      var lapNumber = this.state.laps.length;
      this.setState({
        laps: this.state.laps.concat([{
          id: ++lapNumber,
          ts: this.state.newTimeTs
        }])
      });
    }
  }

  tick = () => {
    var timeTs = this.state.timeTs;
    console.log ("Thick !" + timeTs);
    var startTs = this.state.startTs;
    var now = new Date();
    var nowTs = now.getTime();
    //console.log("timeTs = " + timeTs +" startTs = " + startTs + " nowTs = " + nowTs);
    var elapsed = nowTs - startTs;
    var newTimeTs = timeTs + elapsed;
    //console.log("elapsed = " + elapsed + " newTime = " + newTime);
    this.setState({newTimeTs: newTimeTs});
  }

 // not getInitialState but _getInitialState
 // because we are not suposed to set such a method on a plain js class
 _getInitialState = () => {
    // building a 00:00:00 date
    var zero = new Date(1970, 1, 1, 0, 0, 0, 0);
    var zeroTs = zero.getTime()
    var initialState = {
      isStarted: false,
      laps: [],
      timeTs: zeroTs,
      newTimeTs: zeroTs
    }
    return initialState;
 }

  reset = () => {
    console.log("RESET");
    this.setState( this._getInitialState() );
  }

}

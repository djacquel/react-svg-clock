import React from 'react';
import ClockDefs from './ClockDefs';
import ClockBackground from './ClockBackground';
import ClockPointer from './ClockPointer';
import ClockButton from './ClockButton';
import ClockLaps from './ClockLaps';

export default class Clock extends React.Component {

  static defaultProps = { svgWidth: 200, svgHeight: 300, clockRadius: 75 }

  static propTypes = {
    svgWidth: React.PropTypes.number.isRequired,
    svgHeight: React.PropTypes.number.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
  }

  initialState = {
    isStarted: false,
    timeTs: 2674800000,
    newTimeTs: 2674800000,
    laps: []
  }

  TICK = 100;

  // keep track of setInterval in order to clearInterval
  tickerId;

  constructor(props) {
    super(props);
    this.state = this.initialState;

    var zero = new Date(1970, 1, 1, 0, 0, 0, 0);
    console.log("zero is" + zero.getTime());
  }

  render() {
    var p = this.props;
    var timeTs = this.state.newTimeTs;

    var viewBox = '0 0 ' + p.svgWidth + ' ' + p.svgHeight;
    var clockDiameter = p.clockRadius * 2;
    var centerOffset = (p.svgWidth - clockDiameter)/2;

    var buttonLabel = "Clock isStopped " + (this.state.isStopped === true ? 'yes' : 'no');

    return (
    <div>
      <svg viewBox={viewBox}>
        <g id="clock" transform={'translate(' + centerOffset + ',' + centerOffset + ')'}>
          <ClockDefs clockRadius={p.clockRadius} />
          <ClockBackground clockRadius={p.clockRadius} />
          <ClockPointer type='hour' timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type='min' timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type='sec' timeTs={timeTs} clockRadius={p.clockRadius} />
          <use xlinkHref='#clockCenter' />
          <ClockButton text={this.state.isStarted == false ? 'Start':'Stop'} onClick={this.startStop} className="button startStop" clockRadius={p.clockRadius} order='1' />
          <ClockButton text={this.state.isStarted == true ? 'Lap':'Reset'} onClick={this.lapReset} className="button lapreset" clockRadius={p.clockRadius} order='2' />
          <ClockLaps laps={this.state.laps} />
        </g>
      </svg>
    </div>
    );
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

  reset = () => {
    console.log("RESET");
    this.setState( this.initialState );
  }

}

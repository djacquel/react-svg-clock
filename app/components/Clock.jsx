import '../clock.css';

import React from 'react';
import TopMenu from './TopMenu';
import ClockDefs from './ClockDefs';
import ClockBackground from './ClockBackground';
import ClockPointer from './ClockPointer';
import ClockButton from './ClockButton';
import ClockLaps from './ClockLaps';

export default class Clock extends React.Component {

  static defaultProps = { svgWidth: 200, svgHeight: 280, clockRadius: 75 }

  static propTypes = {
    svgWidth: React.PropTypes.number.isRequired,
    svgHeight: React.PropTypes.number.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
  }

  TICK = 100;

  // keep track of setInterval in order to clearInterval
  tickerId;

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  render() {
    var p = this.props;
    var timeTs = this.state.timeTs;

    var viewBox = '0 0 ' + p.svgWidth + ' ' + p.svgHeight;
    var clockDiameter = p.clockRadius * 2;
    var centerOffset = (p.svgWidth - clockDiameter)/2;

    return (
    <div>
      <TopMenu />
      <h2>Clock</h2>
      <svg viewBox={viewBox}>
        <g id="clock" transform={'translate(' + centerOffset + ',' + centerOffset + ')'}>
          <ClockDefs clockRadius={p.clockRadius} />
          <ClockBackground clockRadius={p.clockRadius} />
          <ClockPointer type='hour' timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type='min' timeTs={timeTs} clockRadius={p.clockRadius} />
          <ClockPointer type='sec' timeTs={timeTs} clockRadius={p.clockRadius} />
          <use xlinkHref='#clockCenter' />
        </g>
      </svg>
    </div>
    );
  }

  componentDidMount() {
    this.start();
  }

  // not getInitialState but _getInitialState
  // because we are not suposed to set such a method on a plain js class
  _getInitialState = () => {
      var time = new Date();
      var timeTs = time.getTime()
      var initialState = {
        timeTs: timeTs
      }
      return initialState;
  }


  start = () => {
      this.tickerId = setInterval(
        this.tick,
        this.TICK
      );
  }

  tick = () => {
    var time = new Date();
    var timeTs = time.getTime();
    this.setState({ timeTs: timeTs });
  }

}

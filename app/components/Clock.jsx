import React from 'react';
import ClockDefs from './ClockDefs';
import ClockBackground from './ClockBackground';
import ClockPointer from './ClockPointer';

export default class Clock extends React.Component {

  static defaultProps = { svgWidth: 200, svgHeight: 200, clockRadius: 75 }

  static propTypes = {
    svgWidth: React.PropTypes.number.isRequired,
    svgHeight: React.PropTypes.number.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
  }

  state = { isStarted: false, time: new Date("24 Dec 1966 00:00:00 +0100") }

  constructor(props) {
    super(props);
  }

  render() {
    var p = this.props;
    var t = this.state.time;

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
          <ClockPointer type='hour' time={t} clockRadius={p.clockRadius} />
          <ClockPointer type='min' time={t} clockRadius={p.clockRadius} />
          <ClockPointer type='sec' time={t} clockRadius={p.clockRadius} />
          <use xlinkHref='#clockCenter' />
          <text x="10" y="15" children={buttonLabel} />
        </g>
      </svg>
      <button onClick={this.startStop}>Start Stop {this.state.isStopped==true ? 'yes' : 'no'}</button>
    </div>
    );
  }

  startStop = (event) => {
    console.log('clicked');
    this.setState({ isStarted: !this.state.isStarted });
  };

}

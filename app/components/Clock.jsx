import React from 'react';
import ClockDefs from './ClockDefs';
import ClockBackground from './ClockBackground';

export default class Clock extends React.Component {

  static defaultProps = { svgWidth: 200, svgHeight: 200, clockRadius: 75 }

  static propTypes = {
    svgWidth: React.PropTypes.number.isRequired,
    svgHeight: React.PropTypes.number.isRequired,
    clockRadius: React.PropTypes.number.isRequired,
  }

  state = { isStopped: true }

  constructor(props) {
    super(props);
  }

  render() {
    var p = this.props;
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
          <text x="10" y="15" children={buttonLabel} />
        </g>
      </svg>
      <button onClick={this.startStop}>Start Stop {this.state.isStopped==true ? 'yes' : 'no'}</button>
    </div>
    );
  }

  startStop = (event) => {
    console.log('clicked');
    this.setState({ isStopped: !this.state.isStopped });
  };

}

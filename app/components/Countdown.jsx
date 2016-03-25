import React from 'react';
import TopMenu from './common/TopMenu';
import NixieDefs from './nixie/NixieDefs';
import NixieBackground from './nixie/NixieBackground';
import NixieNixies from './nixie/NixieNixies';
import NixieButton from './nixie/NixieButton';
import Utils from '../libs/Utils';

export default class Countdown extends React.Component {

  static defaultProps = {
    svgWidth: 450,
    svgHeight: 250,
    clockMargin: 10,
    withTenth: true
  }

  static propTypes = {
    svgWidth: React.PropTypes.number.isRequired,
    svgHeight: React.PropTypes.number.isRequired,
    clockMargin: React.PropTypes.number.isRequired,
    withTenth: React.PropTypes.bool.isRequired,
  }

  // keep track of setInterval in order to clearInterval
  tickerId;

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    console.log(this.state)
  }

  render() {
    var p = this.props;
    var newRemainTs = this.state.newRemainTs;
    var viewBox = '0 0 ' + p.svgWidth + ' ' + p.svgHeight;

    var clockMargin = p.clockMargin;
    var clockWith = p.svgWidth - (clockMargin*2);

    return (
    <div>
      <TopMenu />
      <h2>Countdown with nixies</h2>
      <p>
        <a href="https://fr.wikipedia.org/wiki/Tube_Nixie">Nixies on Wikipedia</a>
      </p>
      <svg viewBox={viewBox} className="chrono">
        <g id="clock" transform={'translate(' + clockMargin + ',' + clockMargin + ')'}>
          <NixieDefs clockWidth={clockWith} />
          <NixieBackground clockWidth={clockWith} />
          <NixieNixies clockWidth={clockWith} withTenth={p.withTenth} newRemainTs={newRemainTs} />
          <NixieButton text={this.state.isStarted == false ? 'Start':'Stop'} onClick={this.startStop} className={this.state.isStarted == false ? 'start':'stop'} clockWith={clockWith} order='1' />
          <NixieButton text='Set time' onClick={this.setTime} clockWith={clockWith} order='2' />
        </g>
      </svg>
    </div>
    );
  }

  startStop = (event) => {
    if ( this.state.isStarted == false ){
      this._start();
    }else if( this.state.isStarted == true ){
      this._stop();
    }
  }

  _start = () => {
    var start = new Date();
    var startTs = start.getTime();
    this.setState({
      isStarted: !this.state.isStarted,
      startTs: startTs
    });

    // if we print milliseconds interval is 10 milliseconds
    // if not it's 1000 msec = 1 sec
    var tickInterval = this.props.withTenth === true ? 10 : 1000;

    // start ticking
    this.tickerId = setInterval(
      this.tick,
      tickInterval
    );
    console.log(this.state)
  }

  _stop = () => {
    this.setState({
      isStarted: !this.state.isStarted,
      remainTs: this.state.newRemainTs
    });
    clearInterval(this.tickerId);
    console.log(this.state)
  }

  setTime = (event) => {
    console.log('setTime');
  }

  tick = () => {
    var s = this.state;

    var now = new Date();
    var nowTs = now.getTime();
    var elapsed = nowTs - s.startTs;
    var newRemainTs = s.remainTs - elapsed;

    // check if we reached zero time
    if( newRemainTs <= s.zeroTs ){
      this._stop();
      this._beep();
    }

    this.setState({newRemainTs: newRemainTs});
  }

  _beep = () => {
    Utils.beep(3);
  }

  // not getInitialState but _getInitialState
  // because we are not suposed to set a getInitialState method on a plain js class
  _getInitialState = () => {

      var zeroTs = Utils.getTimeStamp(0,0,0);
      var startTs = Utils.getTimeStamp(0,0,5);

      var initialState = {
        isStarted: false,
        zeroTs: zeroTs,
        remainTs: startTs,
        newRemainTs: startTs
      }

      return initialState;
  }

}

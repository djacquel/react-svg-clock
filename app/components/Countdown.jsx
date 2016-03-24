import React from 'react';
import TopMenu from './TopMenu';
import NixieDefs from './NixieDefs';
import NixieBackground from './NixieBackground';
import NixieNixies from './NixieNixies';
import NixieButton from './NixieButton';

export default class Countdown extends React.Component {

  static defaultProps = {
    svgWidth: 450,
    svgHeight: 250,
    clockMargin: 10,
    withTenth: false
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
    var newRemainTS = this.state.newRemainTS;
    console.log("Countdown render remainTs =" + newRemainTS)

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
          <NixieNixies clockWidth={clockWith} withTenth={p.withTenth} newRemainTS={newRemainTS} />
          <NixieButton text={this.state.isStarted == false ? 'Start':'Stop'} onClick={this.startStop} className={this.state.isStarted == false ? 'start':'stop'} clockWith={clockWith} order='1' />
          <NixieButton text='Set time' onClick={this.setTime} clockWith={clockWith} order='2' />
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

      var tickInterval = this.state.withTenth ? 10 : 1000;

      this.tickerId = setInterval(
        this.tick,
        tickInterval
      );
    }else if( this.state.isStarted == true ){
      this.setState({
        isStarted: !this.state.isStarted,
        remainTs: this.state.newRemainTs
      });
      clearInterval(this.tickerId);
    }
  }

  setTime = (event) => {
    console.log('setTime');
  }

  reset = (event) => {
    console.log('setTime');
  }

  tick = () => {
    var remainTs = this.state.remainTs;
    console.log ("Thick !" + remainTs);

    var startTs = this.state.startTs;

    var now = new Date();
    var nowTs = now.getTime();

    console.log("remainTs = " + remainTs +" startTs = " + startTs + " nowTs = " + nowTs);

    var elapsed = nowTs - startTs;
    var newRemainTs = startTs - elapsed;
    console.log("elapsed = " + elapsed + " newRemainTs = " + newRemainTs);

    this.setState({newRemainTs: newRemainTs});
    console.log("Tick AFTER setState " + this.state.remainTs)
  }

  // not getInitialState but _getInitialState
  // because we are not suposed to set such a method on a plain js class
  _getInitialState = () => {
      // building a 00:00:00 date
      var zero = new Date(1970, 1, 1, 0, 0, 0, 0);
      var zeroTs = zero.getTime()
      var initialState = {
        isStarted: false,
        remainTs: zeroTs,
        newRemainTS: zeroTs
      }
      return initialState;
  }

  reset = () => {
    console.log("RESET");
    this.setState( this._getInitialState() );
  }

}

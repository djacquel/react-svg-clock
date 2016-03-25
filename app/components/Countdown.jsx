import React from 'react';
import TopMenu from './common/TopMenu';
import NixieDefs from './nixie/NixieDefs';
import NixieBackground from './nixie/NixieBackground';
import NixieNixies from './nixie/NixieNixies';
import NixieEdit from './nixie/NixieEdit';
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
      { this.state.isEditing ?
          <NixieEdit remainTs={this.state.remainTs} onChange={this.editTime} onSave={this.setSaveTime} clockWith={clockWith} order='1' />
          :
          null
      }
      <svg viewBox={viewBox} className="chrono">
        <g id="clock" transform={'translate(' + clockMargin + ',' + clockMargin + ')'}>
          <NixieDefs clockWidth={clockWith} />
          <NixieBackground clockWidth={clockWith} />
          <NixieNixies clockWidth={clockWith} withTenth={p.withTenth} newRemainTs={newRemainTs} />
          { this.state.isEditing ?
              null
              :
              <NixieButton text={this.state.isStarted == false ? 'Start':'Stop'} onClick={this.startStop} className={this.state.isStarted == false ? 'start':'stop'} clockWith={clockWith} order='1' />
          }
          <NixieButton text={this.state.isEditing == false ? 'Set time':'Save time'} onClick={this.setSaveTime} clockWith={clockWith} order='2' />
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
      isStarted: true,
      startTs: startTs
    });

    // if we print milliseconds interval is 100 milliseconds
    // at 10 millesond interval it's buggy -> PERF
    // if not it's 1000 msec = 1 sec
    var tickInterval = this.props.withTenth === true ? 100 : 1000;

    // start ticking
    this.tickerId = setInterval(
      this.tick,
      tickInterval
    );
  }

  _stop = () => {
    this.setState({
      isStarted: false,
      remainTs: this.state.newRemainTs
    });
    clearInterval(this.tickerId);
  }

  setSaveTime = (event) => {
    event.preventDefault();
    if ( this.state.isEditing == false ) {
      this._setTime();
    }else if( this.state.isEditing == true ){
      this._saveTime();
    }
  }

  _setTime = () => {
    this._stop();
    this.setState({
      isEditing: true
    });
    console.log('setTime');
  }

  _saveTime = () => {
    this.setState({
      isEditing: false
    });
    console.log('saveTime');
  }

  editTime = (event) => {
    var editingGroup = event.target.id;
    var newValue = event.target.value
    var currentTimeStr = Utils.getTimeString(this.state.remainTs);
    var [h, m, s] = currentTimeStr.split(":");
    switch (editingGroup) {
      case 'hour':
        h = newValue;
        break;
      case 'min':
        m = newValue;
        break;
      case 'sec':
        s = newValue;
        break;
    }

    var newTs = Utils.getTimeStamp( h, m, s );

    this.setState({
      remainTs : newTs,
      newRemainTs: newTs
    });

  }

  tick = () => {
    var s = this.state;
    var now = new Date();
    var nowTs = now.getTime();
    var elapsed = nowTs - s.startTs;
    var newRemainTs = s.remainTs - elapsed;

    var diff = newRemainTs - s.newRemainTs;
    console.log("thick " + s.newRemainTs + " dif =" + diff);

    // check if we reached zero time
    if( newRemainTs <= s.zeroTs ){
      this._stop();
      var t = this.state.zeroTs;
      this.setState({
        remainTs: t,
        newRemainTs: t
      });
      this._beep();
      console.log(this.state)
    }

    this.setState({newRemainTs: newRemainTs});
  }

  _beep = () => {
    Utils.beep();
  }

  // not getInitialState but _getInitialState
  // because we are not suposed to set a getInitialState method on a plain js class
  _getInitialState = () => {

      var zeroTs = Utils.getTimeStamp(0,0,0);
      var startTs = Utils.getTimeStamp(0,0,2);

      var initialState = {
        isStarted: false,
        isEditing: false,
        zeroTs: zeroTs,
        remainTs: startTs,
        newRemainTs: startTs
      }

      return initialState;
  }

}

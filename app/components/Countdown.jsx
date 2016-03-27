import React from 'react';
import { browserHistory } from 'react-router';

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
    clockMargin: 0,
    withTenth: true
  }

  static propTypes = {
    svgWidth: React.PropTypes.number,
    svgHeight: React.PropTypes.number,
    clockMargin: React.PropTypes.number,
    withTenth: React.PropTypes.bool
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
      { this.state.isEditing ?
          <NixieEdit remainTs={this.state.remainTs} onChange={this.editTime} onSave={this.setSaveTime} clockWith={clockWith} order='1' />
          :
          null
      }
      <svg viewBox={viewBox} className="chrono">
        <g id="clock" transform={'translate(' + clockMargin + ',' + clockMargin + ')'}>
          <NixieDefs clockWidth={clockWith} />
          <NixieBackground clockWidth={clockWith} />
          <NixieNixies clockWidth={clockWith} newRemainTs={newRemainTs} />
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

    // start ticking
    this.tickerId = setInterval(
      this.tick,
      this.props.tickInterval
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
    var currentTimeStr = Utils.getTimeString(this.state.remainTs);
    var [h, m, s] = currentTimeStr.split(":");
    var path = '/countdown/'+Number(h)+'/'+Number(m)+'/'+Number(s);
    browserHistory.push(path);
    console.log('saveTime : path' + path);
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

    var newTs = Utils.getTimeStamp( h, m, s, 0 );

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

      // this.props.params are from url (see router)
      var startHour = this.props.params.hour ? this.props.params.hour : 0;
      var startMin = this.props.params.min ? this.props.params.min : 0;
      var startSec = this.props.params.sec ? this.props.params.sec : 0;

      var startTs = Utils.getTimeStamp(startHour,startMin,startSec);

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

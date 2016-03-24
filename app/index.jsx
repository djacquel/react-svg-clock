"use strict";

import './clock.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Clock from './components/Clock.jsx';
import Chrono from './components/Chrono.jsx';
import Countdown from './components/Countdown.jsx';
import About from './components/About.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Clock}/>
        <Route path="/chrono" component={Chrono}/>
        <Route path="/countdown" component={Countdown}/>
        <Route path="/about" component={About}/>

    </Router>, document.getElementById('app')
);

"use strict";
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Clock from './components/Clock.jsx';
import Countdown from './components/Countdown.jsx';
import About from './components/About.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Clock}/>
        <Route path="/about" component={About}/>
        <Route path="/countdown" component={Countdown}/>
    </Router>, document.getElementById('app')
);

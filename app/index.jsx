import './clock.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Clock from './components/Clock.jsx';
import Chrono from './components/Chrono.jsx';
import Countdown from './components/Countdown.jsx';
import About from './components/About.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Clock} />
            <Route path="/chrono" component={Chrono}/>
            <Route path="/countdown" component={Countdown}/>
            <Route path="/about" component={About}/>
            <Route path="*" component={Clock}/>
        </Route>

    </Router>, document.getElementById('app')
);

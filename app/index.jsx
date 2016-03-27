import './clock.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import App from './components/App.jsx';
import Clock from './components/Clock.jsx';
import Chrono from './components/Chrono.jsx';
import Countdown from './components/Countdown.jsx';
import About from './components/About.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/clock" />
            <Route path="/clock" component={Clock}/>
            <Route path="/chrono" component={Chrono}/>
            <Route path="/countdown(/:hour)(/:min)(/:sec)" component={Countdown}/>
            <Route path="/about" component={About}/>
            <Route path="*" component={Clock}/>
        </Route>

    </Router>, document.getElementById('app')
);

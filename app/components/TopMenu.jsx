import React from 'react';
import { Link } from 'react-router';

const TopMenu = () => (
    <div>
        <ul role="nav">
            <li><Link to="/">Clock</Link></li>
            <li><Link to="/chrono">Chrono</Link></li>
            <li><Link to="/countdown">Countdown</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </div>
);

export default TopMenu;

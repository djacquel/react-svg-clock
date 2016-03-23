import React from 'react';
import { Link } from 'react-router';

const TopMenu = () => (
<div>
    <ul role="nav">
        <li><Link to="/">Stop Watch</Link></li>
        <li><Link to="/countdown">Countdown</Link></li>
        <li><Link to="/about">About</Link></li>
    </ul>
</div>
);

export default TopMenu;

import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

const TopMenu = () => (
    <div>
        <ul role="nav">
            <li><NavLink to="/clock" children="Clock" childrenactiveClassName="active" /></li>
            <li><NavLink to="/chrono" children="Chrono" /></li>
            <li><NavLink to="/countdown" children="Countdown" /></li>
            <li><NavLink to="/about" children="About" /></li>
        </ul>
    </div>
);

export default TopMenu;

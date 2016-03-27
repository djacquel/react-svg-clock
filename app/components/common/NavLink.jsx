import React from 'react';
import { Link } from 'react-router';

const NavLink = ({to, children}) => (
    <Link to={to} activeClassName="active">{children}</Link>
);

export default NavLink;

import React, { PropTypes } from "react";
import { Link } from "react-router";

const NavLink = ({to, children}) => (
    <Link to={to} activeClassName="active">{children}</Link>
);

NavLink.PropTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default NavLink;

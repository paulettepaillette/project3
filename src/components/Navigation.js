import React from 'react';

import { NavLink } from "react-router-dom";

function Navigation(props) {
    // const { currentUser } = props;
    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/products">Women</NavLink>
            <NavLink to="/">Men</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </nav>
    );
}

export default Navigation;
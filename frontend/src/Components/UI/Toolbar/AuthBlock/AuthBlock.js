import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./AuthBlock.module.css";

const authBlock = (props) => {
    return (
        <div className={classes.loginBlock}>
            <NavLink to="/login" activeClassName={classes.activeLink}>
                Login
            </NavLink>
            <NavLink to="/register" activeClassName={classes.activeLink}>
                Register
            </NavLink>
        </div>
    );
};
export default authBlock;

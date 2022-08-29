import React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import Wrap from "../../../hoc/Wrap/Wrap";

import classes from "./Navigation.module.css";

const navigation = (props) => {
    let Links = "No proper stake holder type.";
    switch (props.usertype) {
        case "student":
            Links = (
                <Wrap>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/instiboard"
                    >
                        InstiBoard
                    </NavLink>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/myapplications"
                        exact
                    >
                        My Applications
                    </NavLink>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/messages"
                        exact
                    >
                        Messages
                    </NavLink>
                </Wrap>
            );
            break;
        case "alumni":
            Links = (
                <Wrap>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/instiboard"
                    >
                        InstiBoard
                    </NavLink>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/messages"
                        exact
                    >
                        Messages
                    </NavLink>
                </Wrap>
            );
            break;
        case "instiadmin":
            Links = (
                <Wrap>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/instiboard"
                    >
                        InstiBoard
                    </NavLink>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/recruiters"
                    >
                        Recruiters
                    </NavLink>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/messages"
                        exact
                    >
                        Messages
                    </NavLink>
                </Wrap>
            );
            break;
        case "recruiter":
            Links = (
                <Wrap>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/jobprofiles"
                        exact
                    >
                        Job Profiles
                    </NavLink>
                    <NavLink
                        className={classes.navigationLink}
                        activeClassName={classes.activeLink}
                        to="/messages"
                        exact
                    >
                        Messages
                    </NavLink>
                </Wrap>
            );
            break;
        default:
            Links = <Redirect from="/" to="/login" />;
    }
    return (
        <Wrap>
            <div className={classes.navBar}>{Links}</div>
        </Wrap>
    );
};

const mapStateToProps = (state) => {
    return {
        usertype: state.userType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(navigation);

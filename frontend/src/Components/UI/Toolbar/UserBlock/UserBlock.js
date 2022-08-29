import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./UserBlock.module.css";

const userBlock = (props) => {
    return (
        <div className={classes.userBlock}>
            <div className={classes.profile_pic}></div>
            <div className={classes.user_data}>
                <div className={classes.username}>{props.username}</div>

                <div className={classes.links}>
                    <Link to="/my_profile">My Profile</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        username: state.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(userBlock);

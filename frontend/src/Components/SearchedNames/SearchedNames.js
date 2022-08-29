import classes from "./SearchedNames.module.css";
import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MainFrame from "../UI/MainFrame/MainFrame";

const searchedNames = (props) => {
    let usernames = [];
    for (let username of props.searchedNames) {
        usernames.push(
            <div className={classes.searchedName}>
                <Link
                    className={classes.searchedNameLink}
                    to={"/profile/" + username}
                >
                    {username}
                </Link>
            </div>
        );
    }
    return (
        <MainFrame>
            <div>{usernames}</div>
        </MainFrame>
    );
};

const mapStateToProps = (state) => {
    return {
        searchedNames: state.searchedNames,
    };
};

export default connect(mapStateToProps)(searchedNames);

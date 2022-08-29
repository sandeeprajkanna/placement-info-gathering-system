import React from "react";
import { connect } from "react-redux";

import classes from "./Toolbar.module.css";

// import { Link } from "react-router-dom";
import Wrap from "../../../hoc/Wrap/Wrap";

import UserBlock from "./UserBlock/UserBlock";
import AuthBlock from "./AuthBlock/AuthBlock";
import SearchBar from "./SearchBar/SearchBar";

const toolbar = (props) => {
    return (
        <Wrap>
            <div className={classes.toolbar}>
                <div className={classes.logo}>PlaceMentor</div>
                {props.userId !== null ? (
                    <Wrap>
                        <div className={classes.searchBar}>
                            <SearchBar />
                        </div>
                        <div className={classes.userBlock}>
                            <UserBlock />
                        </div>
                    </Wrap>
                ) : (
                    <div className={classes.authBlock}>
                        <AuthBlock />
                    </div>
                )}
            </div>
        </Wrap>
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

export default connect(mapStateToProps, mapDispatchToProps)(toolbar);

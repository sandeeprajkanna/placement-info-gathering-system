import React from "react";
import NotificationsBar from "../../NotificationsBar/NotificationsBar";
import Navigation from "../Navigation/Navigation";

import classes from "./MainFrame.module.css";

const mainFrame = (props) => {
    return (
        <div className={classes.MainFrame}>
            <div className={classes.leftSide}>
                <NotificationsBar />
            </div>
            <div className={classes.rightSide}>
                <Navigation />
                <div className={classes.content}>{props.children}</div>
            </div>
        </div>
    );
};

export default mainFrame;

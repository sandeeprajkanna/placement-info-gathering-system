import React from "react";

import classes from "./Notification.module.css";

const notification = (props) => {
    return (
        <div
            className={[
                classes.notification,
                props.special ? classes.special : "",
            ].join(" ")}
        >
            <div className={classes.header}>
                <div className={classes.title}>{props.title}</div>
                <div className={classes.time}>{props.time}</div>
            </div>
            <div className={classes.sender}>{props.sender}</div>
            <div className={classes.message}>{props.message}</div>
        </div>
    );
};

export default notification;

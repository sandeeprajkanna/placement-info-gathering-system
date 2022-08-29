import React from "react";
import dateFromStamp from "../../../DateFromStamp";

import classes from "./Notice.module.css";

const notice = (props) => {
    return (
        <div
            className={[
                classes.noticeBox,
                props.is_position ? classes.is_position : "",
            ].join(" ")}
        >
            <div className={classes.header}>
                <div className={classes.title}>
                    <div className={props.unread ? classes.unread : ""}></div>
                    {props.is_position ? "Position: " : ""}
                    {props.title}
                </div>
                <div className={classes.time}>{dateFromStamp( props.time)}</div>
            </div>
            <div className={classes.sender}>{props.sender}</div>
            <div className={classes.message}>{props.message}</div>
        </div>
    );
};

export default notice;

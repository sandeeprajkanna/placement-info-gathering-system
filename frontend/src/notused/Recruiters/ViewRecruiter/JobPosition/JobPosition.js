import React from "react";

import classes from "./JobPosition.module.css";

const jobPosition = (props) => {
    return (
        <div className={classes.jobPosition}>
            <div className={classes.header}>
                <div className={classes.name}>
                    <div className={props.unread ? classes.unread : ""}></div>
                    {props.name}
                </div>
                <div className={classes.time}>{props.time}</div>
            </div>
            {/* <div className={classes.sender}>{props.sender}</div> */}
            <div className={classes.description}>
                Job Description: {props.description}
            </div>
            <div className={classes.data}>
                <div className={classes.dataHead}></div>
                <div className={classes.dataValue}></div>
            </div>
        </div>
    );
};

export default jobPosition;

import React from "react";
import classes from "./Recruiter.module.css";

const recruiter = (props) => {
    return (
        <div className={classes.recruiter}>
            <div className={classes.header}>
                <div className={classes.name}>
                    <div className={props.unread ? classes.unread : ""}></div>
                    {props.name}
                </div>
                {/* <div className={classes.time}>{props.time}</div> */}
            </div>
            {/* <div className={classes.sender}>{props.sender}</div> */}
            <div className={classes.description}>{props.description}</div>
        </div>
    );
};

export default recruiter;

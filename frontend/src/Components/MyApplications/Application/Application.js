import React from "react";
import classes from "./Application.module.css";

const application = (props) => {
    let classname = classes.pending;
    let status = "Pending";

    if (props.status == 2) {
        classname = classes.rejected;
        status = "Rejected";
    } else if (props.status == 1) {
        classname = classes.selected;
        status = "Selected";
    }

    return (
        <div className={[classes.application, classname].join(" ")}>
            <div className={classes.position}>
                <div className={props.unread ? classes.unread : ""}></div>
                {props.position_name}
            </div>
            <div className={classes.company}>{props.company_name}</div>
            <div className={classes.time}>
                Application date: {props.appl_time}
            </div>
            <div className={classes.time}>
                Last Status date: {props.stat_time}
            </div>
            <div className={[classes.status].join(" ")}>{status}</div>
        </div>
    );
};

export default application;

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dateFromStamp from "../../DateFromStamp";

import Notification from "./Notification/Notification";

import classes from "./NotificationsBar.module.css";

const notificationsBar = (props) => {
    let notifications = [];
    let notification_objs = [];

    for (let notificationKey in props.notifications) {
        notification_objs.push(props.notifications[notificationKey]);
    }

    notification_objs = notification_objs.sort((a, b) => {
        return a.time < b.time ? 1 : -1;
    });

    for (let notification of notification_objs) {
        notifications.push(
            <Link
                to={notification.link}
                key={notification.id}
                className={classes.blockLink}
                id={notification.id}
            >
                <Notification
                    title={notification.title}
                    time={dateFromStamp(notification.time)}
                    key={notification.id}
                    message={notification.content}
                    sender={notification.sender}
                />
            </Link>
        );
    }

    if (notifications.length === 0) {
        notifications = "No new notifications. Sit back and Relax.";
    }

    return (
        <div className={classes.NotificationsBar}>
            <h1 className={classes.header}>Notifications</h1>
            <div className={classes.list}>
                <div className={classes.emptyMsg}>{notifications}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications,
    };
};

// const mapDispatchToProps = dispatch => {
//     return{

//     }
// }

export default connect(
    mapStateToProps
    // , mapsDispatchToProps
)(notificationsBar);

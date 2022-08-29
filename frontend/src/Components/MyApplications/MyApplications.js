import classes from "./MyApplications.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import MainFrame from "../UI/MainFrame/MainFrame";
import Application from "./Application/Application";
import dateFromStamp from "../../DateFromStamp";
const myApplications = (props) => {
    let applications = props.applications;
    let applications_list = [];
    let applications_objs = [];
    for (let applicationKey in applications) {
        applications_list.push(applications[applicationKey]);
    }

    applications_list.sort((a, b) => {
        if (a.update_time < b.update_time) {
            return 1;
        }
        return -1;
    });
    for (let application of applications_list) {
        applications_objs.push(
            <Link
                id={"application" + application.id}
                to={`/application/${application.id}`}
                key={application.id}
                className={classes.blockLinks}
            >
                <Application
                    position_name={props.positions[application.position_id].position_title}
                    company_name={application.company}
                    status={application.status}
                    appl_time={dateFromStamp( application.time)}
                    stat_time={dateFromStamp( application.update_time)}
                    unread={!application.read}
                />
            </Link>
        );
    }
    return (
        <MainFrame>
            <h2>My Applications</h2>
            {applications_objs}
        </MainFrame>
    );
};

const mapStateToProps = (state) => {
    return {
        applications: state.applications,
        positions: state.positions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(myApplications);

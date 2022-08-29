import React from "react";

import { withRouter } from "react-router-dom";

import classes from "./ViewRecruiter.module.css";
import MainFrame from "../../MainFrame/MainFrame";
import JobPosition from "./JobPosition/JobPosition";

const viewRecruiter = (props) => {
    return (
        <MainFrame>
            <h2 className={classes.name}>Google Inc</h2>
            <p className={classes.description}> Description: 
                Google Inc is a multinational, publicly-traded organization
                built around the company's hugely popular search engine.
                Google's other enterprises include Internet analytics, cloud
                computing, advertising technologies, and Web app, browser and
                operating system development."
            </p>
            <button className={classes.releaseAll}>
                Release all positions into InstiBoard
            </button>
            <JobPosition
                name="Software Lead"
                description="A lead software engineer's exact responsibilities vary from company to company, but in general they are responsible for overseeing the work, in a technical sense, of a team of software engineers working on a project, ensuring work meets the technical requirements"
                time="08:13 PM"
            />
        </MainFrame>
    );
};

export default withRouter(viewRecruiter);

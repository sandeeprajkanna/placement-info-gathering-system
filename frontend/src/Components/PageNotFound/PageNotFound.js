import React from "react";
import { Link } from "react-router-dom";

import classes from "./PageNotFound.module.css";

const pageNotFound = (props) => {
    return (
        <div className={classes.content}>
            Looks like u hv stepped on wrong link, use the following links to
            get back on track. But be careful such wrong steps in the placement
            could be dangerous!!! Click <Link to="/">here</Link>
        </div>
    );
};

export default pageNotFound;

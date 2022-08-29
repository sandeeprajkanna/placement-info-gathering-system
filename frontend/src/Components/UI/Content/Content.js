import React from "react";

import Wrap from "../../../hoc/Wrap/Wrap";
import Toolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer";

import classes from "./Content.module.css";

const content = (props) => {
    return (
        <Wrap>
            <Toolbar />
            <div className={classes.ContentDiv}>{props.children}</div>
            <Footer />
        </Wrap>
    );
};

export default content;

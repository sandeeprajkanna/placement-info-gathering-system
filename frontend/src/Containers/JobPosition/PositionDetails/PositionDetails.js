import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actionCreators";

import classes from "./PositionDetails.module.css";
import dateFromStamp from "../../../DateFromStamp";

class PositionDetails extends React.Component {
    componentDidMount() {
    }

    render() {
        let position = this.props.positions[`${this.props.id}`];

        return (
            <div className={classes.position}>
                <div className={classes.header}>
                    <div className={classes.position_title}>
                        {position.position_title}
                    </div>
                    <div className={classes.company_name}>
                        {position.company}
                    </div>
                </div>
                <div className={classes.description}>
                    Description: {position.description}
                </div>
                <table className={classes.details}>
                    <tr>
                        <td>Dead Line for applications</td>
                        <td>{dateFromStamp(position.deadline)}</td>
                    </tr>
                    <tr>
                        <td>CTC</td>
                        <td>{position.CTC}</td>
                    </tr>
                    <tr>
                        <td>Release Date</td>
                        <td>{dateFromStamp(position.release_time)}</td>
                    </tr>
                    <tr>
                        <td>Departments</td>
                        <td>{position.depts}</td>
                    </tr>
                    <tr>
                        <td>Degrees</td>
                        <td>{position.degrees}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        positions: state.positions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        markAsRead: (noticeId) =>
            dispatch(actions.markAsRead("position", noticeId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PositionDetails));

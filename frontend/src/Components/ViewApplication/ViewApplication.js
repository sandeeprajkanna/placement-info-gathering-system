import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actionCreators";

import classes from "./ViewApplication.module.css";
import "./ViewApplication.css";

import MainFrame from "../UI/MainFrame/MainFrame";
import PositionDetails from "../../Containers/JobPosition/PositionDetails/PositionDetails";
import Wrap from "../../hoc/Wrap/Wrap";

class ViewApplication extends React.Component {
    state = {};

    componentDidMount() {
        document.title = "Application";
        this.props.applicationDetails(this.props.match.params.id);
    }

    render() {
        let application = this.props.currentApplication;
        let buttons = null;
        let profileDetails = null;
        if (application !== null) {
            if (application.read === false) {
                this.props.markAsRead(application.id);
            }
            profileDetails = (
                <Wrap>
                    <PositionDetails id={application.position_id} />
                    <div>
                        Link Resume :{" "}
                        <a href={application.resume_link}>
                            {application.resume_link}
                        </a>
                    </div>
                </Wrap>
            );

            if (application.status === 0) {
                if (this.props.userType === "recruiter") {
                    buttons = (
                        <Wrap>
                            <button
                                className={[classes.options, classes.able].join(
                                    " "
                                )}
                                onClick={() => {
                                    this.props.selectApplication(
                                        application.id,
                                        1
                                    );
                                }}
                            >
                                Accept
                            </button>
                            <button
                                className={[
                                    classes.options,
                                    classes.notable,
                                ].join(" ")}
                                onClick={() => {
                                    this.props.selectApplication(
                                        application.id,
                                        2
                                    );
                                }}
                            >
                                Reject
                            </button>
                        </Wrap>
                    );
                } else {
                    buttons = (
                        <button
                            className={[classes.options, classes.done].join(
                                " "
                            )}
                            disabled
                        >
                            Pending
                        </button>
                    );
                }
            } else if (application.status === 1) {
                buttons = (
                    <button
                        className={[classes.options, classes.able].join(" ")}
                        disabled
                    >
                        Selected
                    </button>
                );
            } else if (application.status === 2) {
                buttons = (
                    <button
                        className={[classes.options, classes.notable].join(" ")}
                        disabled
                    >
                        Rejected
                    </button>
                );
            }
        }

        return (
            <MainFrame>
                {profileDetails}
                {buttons}
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userType: state.userType,
        currentApplication: state.current_application,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        applicationDetails: (positionId) =>
            dispatch(actions.applicationDetails(positionId)),
        selectApplication: (applId, newStatus) =>
            dispatch(actions.selectApplication(applId, newStatus)),
        markAsRead: (noticeId) =>
            dispatch(actions.markAsRead("application", noticeId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ViewApplication));

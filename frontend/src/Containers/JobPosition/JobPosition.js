import React from "react";
import { Link, withRouter } from "react-router-dom";
import MainFrame from "../../Components/UI/MainFrame/MainFrame";

import classes from "./JobPosition.module.css";
import PositionDetails from "./PositionDetails/PositionDetails";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actionCreators";
import Wrap from "../../hoc/Wrap/Wrap";
import dateFromStamp from "../../DateFromStamp";

class JobPosition extends React.Component {
    state = {
        resumeUploadOwn: true,
        resumeLink: null,
        feedback: "",
    };
    componentDidMount() {
        let positionId = this.props.match.params.id;
        let position = this.props.positions[`${positionId}`];

        if (position !== undefined) {
            document.title = position.position_title + " | " + position.company;
            if (!position.read)
                // document
                //     .getElementById("notifyposition" + position.id)
                //     .remove();
                this.props.markAsRead(position.id);
            this.props.getPosition(position.id);
        }
    }

    // let classname = classes.pending;
    // let status = "Pending";

    // if (props.status == 1) {
    //     classname = classes.rejected;
    //     status = "Rejected";
    // } else if (props.status == 2) {
    //     classname = classes.selected;
    //     status = "Selected";
    // }
    render() {
        let position = this.props.positions[`${this.props.match.params.id}`];
        let profile = this.props.profile;
        let features = null;
        let applications = [];
        let feedbacks = [];
        let hasApplied = false;
        let application = null;
        for (let applicationKey in this.props.applications) {
            if (
                this.props.applications[applicationKey].position_id ===
                position.id
            ) {
                application = this.props.applications[applicationKey];
                hasApplied = true;
            }
        }

        if (this.props.userType === "student") {
            if (profile.dept === undefined || profile.degree === undefined) {
                features =
                    "Please set Degree and Dept in the profile to apply to the position";
            } else {
                if (
                    !position.depts.includes(profile.dept) ||
                    !position.degrees.includes(profile.degree)
                ) {
                    features = (
                        <button
                            className={[classes.options, classes.notable].join(
                                " "
                            )}
                            disabled
                        >
                            Degree and Department Not Matched to Apply
                        </button>
                    );
                } else if (
                    Date.now() / 1000 > position.deadline &&
                    !hasApplied
                ) {
                    features = (
                        <button
                            className={[classes.options, classes.notable].join(
                                " "
                            )}
                            disabled
                        >
                            Deadline passed
                        </button>
                    );
                } else if (!hasApplied) {
                    features = (
                        <Wrap>
                            <div className={classes.upload_file}>
                                <div className={classes.toggleFile}>
                                    <input
                                        id="checkbox_resume"
                                        type="checkbox"
                                        onChange={(e) =>
                                            this.setState((prevstate) => {
                                                return {
                                                    ...this.state,
                                                    resumeUploadOwn: !prevstate.resumeUploadOwn,
                                                };
                                            })
                                        }
                                    />
                                    <label for="checkbox_resume">
                                        Use the same resume from my profile
                                    </label>
                                </div>
                                {this.state.resumeUploadOwn ? (
                                    <input
                                        type="text"
                                        name="resume_file"
                                        placeholder="Resume Link"
                                        className={classes.File}
                                        onChange={(e) => {
                                            this.setState({
                                                ...this.state,
                                                resumeLink: e.target.value,
                                            });
                                        }}
                                        value={this.state.resumeLink}
                                    />
                                ) : this.props.profile.resume_link !==
                                  undefined ? (
                                    "Uploaded Resume Link : " +
                                    this.props.profile.resume_link
                                ) : (
                                    "No Resume Uploaded to profile"
                                )}
                            </div>
                            <button
                                className={[classes.options, classes.able].join(
                                    " "
                                )}
                                onClick={() =>
                                    this.props.applyToPosition(
                                        position.id,
                                        this.state.resumeUploadOwn
                                            ? this.state.resumeLink
                                            : this.props.profile.resume_link
                                    )
                                }
                            >
                                Apply to the Position
                            </button>
                        </Wrap>
                    );
                } else {
                    let status = application.status;
                    let statusBar = null;
                    if (status === 1) {
                        statusBar = (
                            <button
                                className={[classes.options, classes.able].join(
                                    " "
                                )}
                            >
                                Selected
                            </button>
                        );
                    } else if (status === 2) {
                        statusBar = (
                            <button
                                className={[
                                    classes.options,
                                    classes.notable,
                                ].join(" ")}
                                disabled
                            >
                                Rejected
                            </button>
                        );
                    } else {
                        statusBar = (
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
                    features = (
                        <Wrap>
                            {statusBar}
                            <button
                                className={[classes.options, classes.done].join(
                                    " "
                                )}
                            >
                                <Link to={"/application/" + application.id}>
                                    View Application
                                </Link>
                            </button>
                        </Wrap>
                    );
                }
            }
        }
        if (this.props.userType === "instiadmin") {
            if (position.release_time === null) {
                features = (
                    <button
                        className={[classes.options, classes.able].join(" ")}
                        onClick={() => this.props.releasePosition(position.id)}
                    >
                        Release to InstiBoard
                    </button>
                );
            } else {
                features = (
                    <button
                        className={[classes.options, classes.done].join(" ")}
                        disabled
                    >
                        Released to InsitBoard
                    </button>
                );
            }
        }
        if (this.props.userType === "recruiter") {
            let currApplications = this.props.currentPosApplications.sort(
                (a, b) => {
                    if (a.status > b.status) {
                        return 1;
                    }
                    return -1;
                }
            );
            for (let currapplcnid in currApplications) {
                let currapplcn = currApplications[currapplcnid];
                let statusText = "pending";
                if (currapplcn.status === 1) {
                    statusText = "selected";
                } else if (currapplcn.status === 2) {
                    statusText = "rejected";
                }
                applications.push(
                    <Link
                        className={classes.BlockLink}
                        to={"/application/" + currapplcn.id}
                        exact
                    >
                        <div
                            className={[
                                classes.application,
                                classes[statusText],
                            ].join(" ")}
                        >
                            <div className={classes.applicant}>
                                {/* {props.applicant_name} */}
                                {currapplcn.candidateName}
                            </div>
                            <div className={classes.dept}>
                                {currapplcn.dept +
                                    " " +
                                    currapplcn.degree +
                                    " " +
                                    currapplcn.cgpa}
                            </div>
                            <div
                                className={[
                                    classes.status,
                                    classes["statusText"],
                                ].join(" ")}
                            >
                                {statusText}
                            </div>
                        </div>
                    </Link>
                );
            }
        }
        if (
            this.props.userType === "student" ||
            this.props.userType === "alumni"
        ) {
            let currfeedbacks = this.props.currentPosFeedbacks.sort((a, b) => {
                if (a.time < b.time) {
                    return 1;
                }
                return -1;
            });
            for (let currfeedback of currfeedbacks) {
                feedbacks.push(
                    <div className={classes.application}>
                        <div className={classes.applicant}>
                            {/* {props.applicant_name} */}
                            {currfeedback.authorName}
                        </div>
                        <div className={classes.dept}>
                            {dateFromStamp(currfeedback.time)}
                        </div>
                        <div>{currfeedback.content}</div>
                    </div>
                );
            }
        }
        if (this.props.userType === "alumni") {
            features = (
                <Wrap>
                    <textarea
                        placeholder="Enter your Feedback"
                        value={this.state.feedback}
                        onChange={(e) => {
                            this.setState({
                                ...this.state,
                                feedback: e.target.value,
                            });
                        }}
                        className={classes.contentInput}
                    ></textarea>
                    <button
                        onClick={() =>
                            this.props.submitFeedback(
                                position.id,
                                this.state.feedback
                            )
                        }
                    >
                        Submit
                    </button>
                </Wrap>
            );
        }
        return (
            <MainFrame>
                <PositionDetails id={position.id} />

                <div className={classes.features}>{features}</div>

                <div className={classes.applications}>{applications}</div>

                <div className={classes.applications}>{feedbacks}</div>
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userType: state.userType,
        positions: state.positions,
        profile: state.userProfile,
        applications: state.applications,
        currentPosApplications: state.currentPosApplications,
        currentPosFeedbacks: state.currentPosFeedbacks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        markAsRead: (noticeId) =>
            dispatch(actions.markAsRead("position", noticeId)),
        applyToPosition: (positionId, resumeLink) =>
            dispatch(actions.applyToPosition(positionId, resumeLink)),
        releasePosition: (positionId) =>
            dispatch(actions.releasePosition(positionId)),
        getPosition: (positionId) => dispatch(actions.getPosition(positionId)),
        submitFeedback: (positionId, feedback) =>
            dispatch(actions.writeFeedback(positionId, feedback)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(JobPosition));

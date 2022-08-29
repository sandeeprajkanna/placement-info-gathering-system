import React from "react";
import MainFrame from "../UI/MainFrame/MainFrame";
import { withRouter, Redirect } from "react-router-dom";
import classes from "./UserProfile.module.css";
import * as actionCreators from "../../store/actions/actionCreators";
import { connect } from "react-redux";

class UserProfile extends React.Component {
    componentDidMount() {
        document.title =
            this.props.match.params.username + " | " + " User Profile";
        this.props.getProfile(this.props.match.params.username);
    }
    render() {
        if (this.props.match.params.username === this.props.username) {
            return <Redirect to="/my_profile" />;
        }
        if (
            this.props.searchedProfile === undefined ||
            this.props.searchedProfile === null
        ) {
            return <MainFrame>You are not allowed to see this profile</MainFrame>
        }
        return (
            <MainFrame>
                {this.props.searchedProfile.usertype === "Student" ? (
                    <div className={classes.userProfile}>
                        <div className={classes.pic}></div>
                        <div className={classes.username}>
                            {this.props.searchedProfile.username}
                        </div>
                        <div className={classes.username}>
                            {this.props.searchedProfile.usertype}
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Email:</div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.email}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>CGPA:</div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.cgpa}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Degree:</div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.degree}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Roll Number: </div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.roll_num}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Description: </div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.description}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Department: </div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.dept}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Resume Link: </div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.resume_link}
                            </div>
                        </div>
                    </div>
                ) : this.props.searchedProfile.usertype === "Alumni" ? (
                    <div className={classes.userProfile}>
                        <div className={classes.pic}></div>
                        <div className={classes.username}>
                            {this.props.searchedProfile.username}
                        </div>
                        <div className={classes.username}>
                            {this.props.searchedProfile.usertype}
                        </div>

                        <div className={classes.content_container}>
                            <div className={classes.head}>Email:</div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.email}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Degree:</div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.degree}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Description: </div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.description}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Department: </div>
                            <div className={classes.content}>
                                {this.props.searchedProfile.dept}
                            </div>
                        </div>
                    </div>
                ) : null}
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchedProfile: state.searchedProfile,
        username: state.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (string) => dispatch(actionCreators.getProfile(string)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserProfile));

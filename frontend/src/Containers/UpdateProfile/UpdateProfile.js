import React from "react";
import { connect } from "react-redux";

import classes from "./UpdateProfile.module.css";
import * as actionCreators from "../../store/actions/actionCreators";
import MainFrame from "../../Components/UI/MainFrame/MainFrame";

class UpdateProfile extends React.Component {
    state = {
        isValid: false,
        dept: this.props.profile.dept,
        roll_num: this.props.profile.roll_num,
        cgpa: this.props.profile.cgpa,
        degree: this.props.profile.degree,
        resume_link: this.props.profile.resume_link,
        description: this.props.profile.description,
        year: this.props.profile.year,
    };

    componentDidMount() {
        document.title = this.props.username + " | " + " User Profile";
    }

    submitHandler = (e) => {
        let isValid = true;
        if (isValid)
            this.props.updateprofile(
                this.state.dept,
                this.state.roll_num,
                this.state.cgpa,
                this.state.degree,
                this.state.resume_link,
                this.state.description,
                this.state.year
            );
    };

    onChangeValue = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value,
        });
    };

    render() {
        if (this.props.profile === undefined) {
            return <div>"Happy path"</div>;
        }
        return (
            <MainFrame>
                {this.props.usertype === "student" ? (
                    <div className={classes.userProfile}>
                        <div className={classes.pic}></div>
                        <div className={classes.username}>
                            {this.props.profile.username}
                        </div>
                        <div className={classes.username}>
                            {this.props.usertype}
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Email:</div>
                            <div className={classes.content}>
                                {this.props.email}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>CGPA:</div>
                            <div className={classes.content}>
                                {this.props.profile.cgpa}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Degree:</div>
                            <div className={classes.content}>
                                {this.props.profile.degree}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Roll Number: </div>
                            <div className={classes.content}>
                                {this.props.profile.roll_num}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Description: </div>
                            <div className={classes.content}>
                                {this.props.profile.description}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Department: </div>
                            <div className={classes.content}>
                                {this.props.profile.dept}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Resume Link: </div>
                            <div className={classes.content}>
                                {this.props.profile.resume_link}
                            </div>
                        </div>
                    </div>
                ) : this.props.usertype === "alumni" ? (
                    <div className={classes.userProfile}>
                        <div className={classes.pic}></div>
                        <div className={classes.username}>
                            {this.props.profile.username}
                        </div>
                        <div className={classes.username}>
                            {this.props.usertype}
                        </div>

                        <div className={classes.content_container}>
                            <div className={classes.head}>Email:</div>
                            <div className={classes.content}>
                                {this.props.email}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Degree:</div>
                            <div className={classes.content}>
                                {this.props.profile.degree}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Description: </div>
                            <div className={classes.content}>
                                {this.props.profile.description}
                            </div>
                        </div>
                        <div className={classes.content_container}>
                            <div className={classes.head}>Department: </div>
                            <div className={classes.content}>
                                {this.props.profile.dept}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className={classes.regContainer}>
                    <div className={classes.regForm}>
                        <div className={classes.inputForm}>
                            <input
                                type="text"
                                name="dept"
                                placeholder="Department"
                                onChange={(e) =>
                                    this.onChangeValue("dept", e.target.value)
                                }
                                value={this.state.dept}
                            />
                            <input
                                type="text"
                                name="degree"
                                placeholder="Degree"
                                onChange={(e) =>
                                    this.onChangeValue("degree", e.target.value)
                                }
                                value={this.state.degree}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                onChange={(e) =>
                                    this.onChangeValue(
                                        "description",
                                        e.target.value
                                    )
                                }
                                value={this.state.description}
                            />
                            {this.props.usertype === "student" ? (
                                <div>
                                    <input
                                        type="text"
                                        name="cgpa"
                                        placeholder="CGPA"
                                        onChange={(e) =>
                                            this.onChangeValue(
                                                "cgpa",
                                                e.target.value
                                            )
                                        }
                                        value={this.state.cgpa}
                                    />
                                    <input
                                        type="text"
                                        name="roll_num"
                                        placeholder="Roll Number"
                                        onChange={(e) =>
                                            this.onChangeValue(
                                                "roll_num",
                                                e.target.value
                                            )
                                        }
                                        value={this.state.roll_num}
                                    />
                                    <input
                                        type="text"
                                        name="resume_link"
                                        placeholder="Resume Link"
                                        onChange={(e) =>
                                            this.onChangeValue(
                                                "resume_link",
                                                e.target.value
                                            )
                                        }
                                        value={this.state.resume_link}
                                    />
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Graduation Year"
                                    onChange={(e) =>
                                        this.onChangeValue(
                                            "year",
                                            e.target.value
                                        )
                                    }
                                    value={this.state.resume_link}
                                />
                            )}
                            <button
                                name="submit"
                                className={classes.submit}
                                onClick={this.submitHandler}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.userProfile,
        usertype: state.userType,
        email: state.userEmail,
        username: state.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        updateprofile: (
            dept,
            roll_num,
            cgpa,
            degree,
            resume_link,
            description,
            year
        ) =>
            dispatch(
                actionCreators.updateprofile(
                    dept,
                    roll_num,
                    cgpa,
                    degree,
                    resume_link,
                    description,
                    year
                )
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);

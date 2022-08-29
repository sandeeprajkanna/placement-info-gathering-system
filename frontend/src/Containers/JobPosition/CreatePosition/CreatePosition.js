import classes from "./CreatePosition.module.css";
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actionCreators.js";

import MainFrame from "../../../Components/UI/MainFrame/MainFrame";

class CreatePosition extends React.Component {
    state = {
        isValid: false,
        positionName: "",
        deadline: "",
        ctc: "",
        jobDescription: "",
        depts: "",
        degrees: "",
    };

    componentDidMount() {
        document.title = "Create Position | PlaceMentor";
        // this.props.setPositionError("");
    }

    submitHandler = () => {
        // let errors = {};
        // let isValid = true;
        // this.props.setPositionError("");
        // if (this.state.positionName === "") {
        //     this.props.setAuthError("All fields are required!");
        //     errors["positionName"] = true;
        //     isValid = false;
        // }
        // if (this.state.ctc === "") {
        //     this.props.setAuthError("All fields are required!");
        //     errors["username"] = true;
        //     isValid = false;
        // }
        // if (this.state.email === "") {
        //     this.props.setAuthError("All fields are required!");
        //     errors["email"] = true;
        //     isValid = false;
        // }
        // if (this.state.password === "") {
        //     this.props.setAuthError("All fields are required!");
        //     errors["password"] = true;
        //     isValid = false;
        // }
        // if (this.state.reenterpass === "") {
        //     this.props.setAuthError("All fields are required!");
        //     errors["reenterpass"] = true;
        // }
        // if (
        //     this.state.accountType === "recruiter" &&
        //     this.state.gen_id === ""
        // ) {
        //     this.props.setAuthError("All fields are required!");
        //     errors["gen_id"] = true;
        //     isValid = false;
        // }
        // if (isValid)
        let d = new Date(this.state.deadline).getTime();
        this.props.createPosition(
            this.state.positionName,
            this.props.username,
            d/1000,
            this.state.ctc,
            this.state.jobDescription,
            this.state.depts,
            this.state.degrees
        );
        // this.setState({ ...this.state, errors: errors, isValid: isValid });
    };

    render() {
        return (
            <MainFrame>
                <h2>Create a new Job Position</h2>
                <input
                    type="text"
                    name="positionName"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            positionName: e.target.value,
                        });
                    }}
                    value={this.state.positionName}
                    className={classes.subjectInput}
                    placeholder="Position Name"
                />
                <input
                    type="number"
                    name="CTC"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            ctc: e.target.value,
                        });
                    }}
                    value={this.state.ctc}
                    className={classes.subjectInput}
                    placeholder="CTC"
                />
                <input
                    type="date"
                    name="deadline"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            deadline: e.target.value,
                        });
                    }}
                    value={this.state.deadline}
                    className={classes.subjectInput}
                    placeholder="CTC"
                />
                <textarea
                    name="description"
                    name=""
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            jobDescription: e.target.value,
                        });
                    }}
                    value={this.state.jobDescription}
                    className={classes.contentInput}
                    placeholder="Content"
                ></textarea>
                <input
                    type="text"
                    name="depts"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            depts: e.target.value,
                        });
                    }}
                    value={this.state.depts}
                    className={classes.subjectInput}
                    placeholder="Departments"
                />
                <input
                    type="text"
                    name="degrees"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            degrees: e.target.value,
                        });
                    }}
                    value={this.state.degrees}
                    className={classes.subjectInput}
                    placeholder="Degrees"
                />
                <button
                    onClick={() => {
                        this.submitHandler();
                    }}
                >
                    Submit
                </button>
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPosition: (
            positionName,
            companyName,
            deadline,
            ctc,
            jobDescription,
            depts,
            degrees
        ) => {
            dispatch(
                actionCreators.createPosition(
                    positionName,
                    companyName,
                    deadline,
                    ctc,
                    jobDescription,
                    depts,
                    degrees
                )
            );
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePosition);

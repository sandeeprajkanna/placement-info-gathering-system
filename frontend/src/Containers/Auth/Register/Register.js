import React from "react";
import { connect } from "react-redux";

import classes from "./Register.module.css";
import * as actionCreators from "../../../store/actions/actionCreators";

class Register extends React.Component {
    state = {
        isValid: false,
        accountType: "student",
        username: "",
        password: "",
        email: "",
        reenterpass: "",
        gen_id: "",
        errors: [""],
    };

    componentDidMount() {
        document.title = "PlaceMentor | Register an account";
        this.props.setAuthError("");
    }

    submitHandler = (e) => {
        let errors = {};
        let isValid = true;
        this.props.setAuthError("");
        if (this.state.password.length < 6) {
            this.props.setAuthError("Password has to be atleast 6 chars!");
            errors["password"] = true;
            errors["reenterpass"] = true;
            isValid = false;
        }
        if (this.state.password !== this.state.reenterpass) {
            this.props.setAuthError("Passwords must match !");
            errors["password"] = true;
            errors["reenterpass"] = true;
            isValid = false;
        }
        if (this.state.username === "") {
            this.props.setAuthError("All fields are required!");
            errors["username"] = true;
            isValid = false;
        }
        if (this.state.email === "") {
            this.props.setAuthError("All fields are required!");
            errors["email"] = true;
            isValid = false;
        }
        if (this.state.password === "") {
            this.props.setAuthError("All fields are required!");
            errors["password"] = true;
            isValid = false;
        }
        if (this.state.reenterpass === "") {
            this.props.setAuthError("All fields are required!");
            errors["reenterpass"] = true;
        }
        if (
            this.state.accountType === "recruiter" &&
            this.state.gen_id === ""
        ) {
            this.props.setAuthError("All fields are required!");
            errors["gen_id"] = true;
            isValid = false;
        }
        if (isValid)
            this.props.register(
                this.state.username,
                this.state.password,
                this.state.email,
                this.state.accountType,
                this.state.gen_id
            );
        this.setState({ ...this.state, errors: errors, isValid: isValid });
    };

    onChangeValue = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value,
        });
    };

    changeType = (userType) => {
        this.setState({
            ...this.state,
            accountType: userType,
        });
    };

    render() {
        return (
            <div className={classes.regContainer}>
                <div className={classes.regForm}>
                    <div className={classes.header}>
                        Register into PlaceMentor
                    </div>
                    <div className={classes.typeSelector}>
                        <button
                            className={[
                                classes.btnType,
                                this.state.accountType === "student"
                                    ? classes.active
                                    : "",
                            ].join(" ")}
                            onClick={() => this.changeType("student")}
                        >
                            Student
                        </button>
                        <button
                            className={[
                                classes.btnType,
                                this.state.accountType === "recruiter"
                                    ? classes.active
                                    : "",
                            ].join(" ")}
                            onClick={() => this.changeType("recruiter")}
                        >
                            Recruiter
                        </button>
                        <button
                            className={[
                                classes.btnType,
                                this.state.accountType === "alumni"
                                    ? classes.active
                                    : "",
                            ].join(" ")}
                            onClick={() => this.changeType("alumni")}
                        >
                            Alumni
                        </button>
                    </div>
                    <div className={classes.inputForm}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(e) =>
                                this.onChangeValue("username", e.target.value)
                            }
                            value={this.state.username}
                            className={
                                "username" in this.state.errors
                                    ? classes.errorField
                                    : ""
                            }
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={(e) =>
                                this.onChangeValue("email", e.target.value)
                            }
                            value={this.state.email}
                            className={
                                "email" in this.state.errors
                                    ? classes.errorField
                                    : ""
                            }
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) =>
                                this.onChangeValue("password", e.target.value)
                            }
                            value={this.state.password}
                            className={
                                "password" in this.state.errors
                                    ? classes.errorField
                                    : ""
                            }
                        />
                        <input
                            type="password"
                            name="reenterpass"
                            placeholder="Re-Enter Password"
                            onChange={(e) =>
                                this.onChangeValue(
                                    "reenterpass",
                                    e.target.value
                                )
                            }
                            value={this.state.reenterpass}
                            className={
                                "reenterpass" in this.state.errors
                                    ? classes.errorField
                                    : ""
                            }
                        />
                        {this.state.accountType === "recruiter" ? (
                            <input
                                type="text"
                                name="gen_id"
                                placeholder="Recruiter Genuiune ID"
                                onChange={(e) =>
                                    this.onChangeValue("gen_id", e.target.value)
                                }
                                value={this.state.gen_id}
                                className={
                                    "gen_id" in this.state.errors
                                        ? classes.errorField
                                        : ""
                                }
                            />
                        ) : (
                            ""
                        )}
                        <p className={classes.errorMsg}>
                            {this.props.errorMsg}
                        </p>
                        <p className={classes.successMsg}>
                            {this.props.successMsg}
                        </p>
                        <button
                            name="submit"
                            className={classes.submit}
                            onClick={this.submitHandler}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMsg: state.authError,
        successMsg: state.authSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (uname, pass, email, type, gen_id) =>
            dispatch(actionCreators.register(uname, pass, email, type, gen_id)),
        setAuthError: (message) =>
            dispatch(actionCreators.setAuthError(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

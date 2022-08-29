import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actionCreators from "../../../store/actions/actionCreators";

import classes from "./Login.module.css";

class Login extends React.Component {
    state = {
        isValid: true,
        username: "",
        password: "",
        errors: [],
    };

    componentDidMount() {
        document.title = "PlaceMentor | Login into account";
        this.props.setAuthError("");
    }

    submitHandler = (e) => {
        let errors = {};
        let isValid = true;

        this.props.setAuthError("");

        if (this.state.username === "") {
            this.props.setAuthError("All fields are required!");
            errors["username"] = true;
            isValid = false;
        }

        if (this.state.password === "") {
            this.props.setAuthError("All fields are required!");
            errors["password"] = true;
            isValid = false;
        }

        if (isValid) this.props.login(this.state.username, this.state.password);

        this.setState({ ...this.state, errors: errors, isValid: isValid });
    };

    onChangeValue = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value,
        });
    };

    render() {
        if (this.props.userId !== null) {
            return <Redirect to="/" />;
        }
        return (
            <div className={classes.loginContainer}>
                <div className={classes.loginForm}>
                    <div className={classes.header}>Login into PlaceMentor</div>

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
                        <p className={classes.errorMsg}>
                            {this.props.errorMsg}
                        </p>
                        <button
                            name="submit"
                            className={classes.submit}
                            onClick={this.submitHandler}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        errorMsg: state.authError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (uname, pass) => dispatch(actionCreators.login(uname, pass)),
        setAuthError: (message) =>
            dispatch(actionCreators.setAuthError(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

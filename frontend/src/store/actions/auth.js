import axios from "axios";

import * as actionTypes from "./actionTypes";
import { getData } from "./getData";

export const autoLogin = () => {
    if (JSON.parse(localStorage.getItem("authToken")) !== undefined) {
        return (dispatch) => {
            dispatch({ type: actionTypes.AUTH_START });

            let axiosOptions = {
                method: "POST",
                url: `${process.env.REACT_APP_DATABASE_URI}/getuserdetails`,
                data: {
                    auth_token: JSON.parse(localStorage.getItem("authToken")),
                },
            };

            axios(axiosOptions)
                .then((response) => {
                    dispatch({
                        type: actionTypes.AUTH_LOGIN,
                        payload: {
                            userId: response.data.user_id,
                            username: response.data.name,
                            userEmail: response.data.email,
                            userType: response.data.usertype,
                            profile: response.data.profile,
                            authToken: JSON.parse(
                                localStorage.getItem("authToken")
                            ),
                            message: "",
                        },
                    });
                })
                .catch((error) => {
                    let message = null;
                    try {
                        message = error.response.data.message;
                    } catch {
                        message = "";
                    }

                    dispatch({
                        type: actionTypes.AUTH_FAIL,
                        payload: {
                            message: message,
                        },
                    });
                });
        };
    }
};

export const setAuthError = (message) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.AUTH_FAIL,
            payload: {
                message: message,
            },
        });
    };
};

export const login = (username, password) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_START });

        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/login`,
            data: {
                username: username,
                password: password,
            },
            // headers: {
            //     authorization: `Basic ${JSON.parse(
            //         localStorage.getItem("authToken")
            //     )}`,
            // },
        };

        axios(axiosOptions)
            .then((response) => {
                dispatch({
                    type: actionTypes.AUTH_LOGIN,
                    payload: {
                        userId: response.data.user_id,
                        username: response.data.username,
                        userEmail: response.data.email,
                        userType: response.data.user_type,
                        authToken: response.data.auth_token,
                        profile: response.data.profile,
                        message: "Succesfully logged in into account.",
                    },
                });
                dispatch(getData());
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Sorry, some error occured, Please Try again.";
                }

                dispatch({
                    type: actionTypes.AUTH_FAIL,
                    payload: {
                        message: message,
                    },
                });
            });
    };
};

export const register = (username, password, email, type, genuineId = "") => {
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_START });

        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/register`,
            data: {
                username: username,
                password: password,
                email: email,
                usertype: type,
            },
            headers: {
                authorization: `Basic ${JSON.parse(
                    localStorage.getItem("authToken")
                )}`,
            },
        };

        if (type === "recruiter") {
            axiosOptions.data["gen_id"] = genuineId;
        }

        axios(axiosOptions)
            .then((response) => {
                dispatch({
                    type: actionTypes.AUTH_REGISTER,
                    payload: {
                        message: "Succesfully registered! Login to continue.",
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Sorry, some error occured, Please Try again.";
                }

                dispatch({
                    type: actionTypes.AUTH_FAIL,
                    payload: {
                        message: message,
                    },
                });
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/logout`,
            data: {},
            headers: {
                authorization: `Basic ${JSON.parse(
                    localStorage.getItem("authToken")
                )}`,
            },
        };

        axios(axiosOptions)
            .then((response) =>
                dispatch({
                    type: actionTypes.AUTH_LOGOUT,
                    payload: {
                        message: "",
                    },
                })
            )
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Sorry, some error occured, Please Try again.";
                }
            });
    };
};

export const updateprofile = (
    dept,
    roll_num,
    cgpa,
    degree,
    resume_link,
    description,
    year
) => {
    return (dispatch) => {

        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/updateprofile`,
            data: {
                dept: dept,
                roll_num: roll_num,
                cgpa: cgpa,
                degree: degree,
                resume_link: resume_link,
                description: description,
                year: year,
            },
            headers: {
                authorization: `Basic ${JSON.parse(
                    localStorage.getItem("authToken")
                )}`,
            },
        };

        axios(axiosOptions)
            .then((response) => {
                dispatch({
                    type: actionTypes.UPDATE_PROFILE,
                    payload: {
                        message: "Succesfully updated! Login to continue.",
                        profile: {
                            dept: dept,
                            roll_num: roll_num,
                            cgpa: cgpa,
                            degree: degree,
                            resume_link: resume_link,
                            description: description,
                            year: year,
                        },
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Sorry, some error occured, Please Try again.";
                }

                dispatch({
                    type: actionTypes.NORMAL_FAIL,
                    payload: {
                        message: message,
                    },
                });
            });
    };
};
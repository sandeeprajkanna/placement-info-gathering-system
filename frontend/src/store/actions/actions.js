import axios from "axios";

import * as actionTypes from "./actionTypes";

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR,
    };
};

export const markAsRead = (entityType, entityId) => {
    return (dispatch) => {
        const axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/readreceipt`,
            data: {
                type: entityType,
                entity_id: entityId,
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
                    type: actionTypes.REMOVE_NOTIFICATION,
                    payload: {
                        entityType: entityType,
                        entityId: entityId,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
                }

                dispatch({
                    type: actionTypes.NORMAL_FAIL,
                    payload: {
                        message: message,
                    },
                });
            });

        dispatch({
            type: actionTypes.REMOVE_NOTIFICATION,
            payload: {
                entityType: entityType,
                entityId: entityId,
            },
        });
    };
};

export const selectApplication = (applicationId, new_status) => {
    return (dispatch) => {
        const axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/selectapplication`,
            data: {
                application_id: applicationId,
                new_status: new_status,
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
                    type: actionTypes.SELECT_APPLICATION,
                    payload: {
                        message: response.data.message,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const fetchUserNames = (searchQuery) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/fetchusernames`,
            data: {
                string: searchQuery,
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
                    type: actionTypes.FETCH_USER_NAMES,
                    payload: {
                        usernames: response.data.names,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const getProfile = (username) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/getprofile`,
            data: {
                username: username,
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
                    type: actionTypes.GET_USER_PROFILE,
                    payload: { profile: response.data.profile },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const releasePosition = (positionId) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/releaseposition`,
            data: {
                position_id: positionId,
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
                    type: actionTypes.RELEASE_POSITION,
                    payload: {
                        position: response.data.position,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const createMessage = (recipient, message_content) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/createmessage`,
            data: {
                recipient_username: recipient,
                msg_content: message_content,
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
                    type: actionTypes.CREATE_MESSAGE,
                    payload: {
                        message_obj: response.data.message_obj,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const createNotice = (subject, content) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/createnotice`,
            data: {
                subject: subject,
                content: content,
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
                    type: actionTypes.CREATE_NOTICE,
                    payload: {
                        notice_obj: response.data.notice_obj,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const applyToPosition = (positionId, resumeLink) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/application`,
            data: {
                profile_id: positionId,
                resume_link: resumeLink,
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
                    type: actionTypes.APPLY_TO_POSITION,
                    payload: {
                        application: response.data.application_obj,
                        message: response.data.message,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const writeFeedback = (positionId, content) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/writefeedback`,
            data: {
                profile_id: positionId,
                feedback_content: content,
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
                    type: actionTypes.CREATE_FEEDBACK,
                    payload: {
                        message: response.data.message,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const createPosition = (
    positionName,
    companyName,
    deadline,
    ctc,
    jobDescription,
    depts,
    degrees
) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/createposition`,
            data: {
                profileName: positionName,
                companyName: companyName,
                deadline: deadline,
                CTC: ctc,
                description: jobDescription,
                depts: depts,
                degrees: degrees,
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
                    type: actionTypes.CREATE_POSITION,
                    payload: {
                        position: response.data.position,
                    },
                });
            })

            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const getPosition = (positionId) => {
    return (dispatch, getState) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/positiondetails`,
            data: {
                positionId: positionId,
            },
            headers: {
                authorization: `Basic ${JSON.parse(
                    localStorage.getItem("authToken")
                )}`,
            },
        };

        axios(axiosOptions)
            .then((response) => {
                let currentUserType = getState().userType;

                if (currentUserType === "recruiter") {
                    let applications = [];
                    for (let application of response.data.applications) {
                        applications.push({
                            candidateName: application.name,
                            cgpa: application.cgpa,
                            dept: application.dept,
                            degree: application.degree,
                            status: application.status,
                            id: application.id,
                        });
                    }
                    dispatch({
                        type: actionTypes.LOAD_POSITION,
                        payload: {
                            currentPosApplications: applications,
                            currentPosFeedbacks: [],
                        },
                    });
                } else if (
                    currentUserType === "alumni" ||
                    currentUserType === "student"
                ) {
                    let feedbacks = [];
                    for (let feedback of response.data.Feedback) {
                        feedbacks.push({
                            authorName: feedback.author_name,
                            time: feedback.time,
                            content: feedback.content,
                        });
                    }
                    dispatch({
                        type: actionTypes.LOAD_POSITION,
                        payload: {
                            currentPosApplications: [],
                            currentPosFeedbacks: feedbacks,
                        },
                    });
                }
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

export const removeMessageNotification = (author) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.REMOVE_NOTIFICATION,
            payload: {
                entityType: "message",
                entityId: author,
            },
        });
    };
};

export const applicationDetails = (application_id) => {
    return (dispatch) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/applicationdetails`,
            data: {
                application_id: application_id,
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
                    type: actionTypes.LOAD_APPLICATION,
                    payload: {
                        application: response.data.application,
                    },
                });
            })
            .catch((error) => {
                let message = null;
                try {
                    message = error.response.data.message;
                } catch {
                    message = "Network Connection Failed. Please try again.";
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

// export const applicationDetails = () => {
//     (dispatch) => {
//         let axiosOptions = {
//             method: "GET",
//             url: `${process.env.REACT_APP_DATABASE_URI}/applicationdetails`,
//             data: {
//                 position_id: positionId,
//             },
//         };

//         axios(axiosOptions)
//             .then((response) => {
//                 dispatch({
//                     type: actionTypes.LOAD_APPLICATION,
//                     payload: {
//                         resumeLink: application.resume_link,
//                         positionId: application.position_id,
//                         status: application.applcn_status,
//                     },
//                 });
//             })
//             .catch((error) => {
//                 dispatch({
//                     type: actionTypes.LOAD_APPLICATION_ERROR,
//                     payload: {
//                         errorMsg: error.response.data.message,
//                     },
//                 });
//             });
//     };
// };

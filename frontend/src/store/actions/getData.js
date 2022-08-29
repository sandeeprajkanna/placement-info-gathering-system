import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as LinkConstants from "../../LinkNames";

export const getData_ = () => {
    return (dispatch) => {
        dispatch(getData_());
    };
};

export const getData = () => {
    return (dispatch, getState) => {
        let axiosOptions = {
            method: "POST",
            url: `${process.env.REACT_APP_DATABASE_URI}/getdata`,
            data: {
                timestamp: getState().lastDataFetchStamp,
            },
            headers: {
                authorization: `Basic ${JSON.parse(
                    localStorage.getItem("authToken")
                )}`,
            },
        };

        axios(axiosOptions)
            .then((response) => {
                let messages = getState().messages;
                let positions = getState().positions;
                let unreleasedpositions = getState().unreleasedpositions;
                let notices = getState().notices;
                let applications = getState().applications;
                let notifications = getState().notifications;
                // Current logged in username
                let current_user = getState().username;
                // Current logged in user typee
                let current_u_type = getState().userType;

                let loadedMessages = response.data.messages;
                // this will be an array of messages both sent and recieved
                // let loadedMessages = [
                //     {
                //         id: 1,
                //         author: "current_user",
                //         recipient: "recipient_name_1",
                //         content: "Content 1",
                //         time: 789654123,
                //         update_time: 987456321,
                //         read: true,
                //     },
                //     {
                //         id: 2,
                //         author: "current_user",
                //         recipient: "recipient_name_1",
                //         content: "Content 2",
                //         time: 789654124,
                //         update_time: 987456322,
                //         read: true,
                //     },
                //     {
                //         id: 3,
                //         author: "recipient_name_2",
                //         recipient: "current_user",
                //         content: "Content 3",
                //         time: 789654134,
                //         update_time: 987456345,
                //         read: false,
                //     },
                //     {
                //         id: 4,
                //         author: "recipient_name_4",
                //         recipient: "current_user",
                //         content: "Content 4",
                //         time: 789654204,
                //         update_time: 987456245,
                //         read: true,
                //     },
                //     {
                //         id: 5,
                //         author: "recipient_name_4",
                //         recipient: "current_user",
                //         content: "Content 5",
                //         time: 789654204,
                //         update_time: 987456245,
                //         read: false,
                //     },
                // ];

                for (let message of loadedMessages) {
                    // Authoured Messages
                    if (message.author === current_user) {
                        // First message related to this recipient
                        if (messages[`${message.recipient}`] === undefined) {
                            messages[`${message.recipient}`] = {};
                        }
                        messages[`${message.recipient}`][
                            `${message.id}`
                        ] = message;
                    }
                    // Recieved Messages
                    else {
                        // First message related to this author
                        if (messages[`${message.author}`] === undefined) {
                            messages[`${message.author}`] = {};
                        }
                        messages[`${message.author}`][
                            `${message.id}`
                        ] = message;
                    }

                    // recipients and authors are names not ids
                    // Notifications regarding the Messages

                    if (message.recipient === current_user) {
                        if (message.read === false) {
                            let latestTime = message.update_time;
                            if (
                                notifications[
                                    `notifymessage${message.author}`
                                ] !== undefined
                            ) {
                                latestTime =
                                    latestTime >
                                    notifications[
                                        `notifymessage${message.author}`
                                    ].time
                                        ? latestTime
                                        : notifications[
                                              `notifymessage${message.author}`
                                          ].time;
                            }
                            notifications[`notifymessage${message.author}`] = {
                                title: `New messages from @${message.author} !!`,
                                id: `notifymessage${message.author}`,
                                link: `${LinkConstants.singlePersonMessages}/${message.author}`,
                                time: latestTime,
                                content: ``,
                                sender: `${message.author}`,
                            };
                        }
                    }
                }

                let loadedNotices = response.data.notices;
                // // this will be an array of notices in the instiboard
                // let loadedNotices = [
                //     {
                //         id: 1,
                //         author: "admin",
                //         subject: "Subject_1",
                //         content: "Content 1",
                //         time: 789654234,
                //         update_time: 942456321,
                //         read: false,
                //     },
                //     {
                //         id: 2,
                //         author: "admin",
                //         subject: "Subject_2",
                //         content: "Content 2",
                //         time: 789652234,
                //         update_time: 987423421,
                //         read: true,
                //     },
                //     {
                //         id: 3,
                //         author: "admin",
                //         subject: "Subject_3",
                //         content: "Content 3",
                //         time: 789423123,
                //         update_time: 984236321,
                //         read: false,
                //     },
                //     {
                //         id: 4,
                //         author: "admin",
                //         subject: "Subject_4",
                //         content: "Content 4",
                //         time: 782343123,
                //         update_time: 984425321,
                //         read: true,
                //     },
                // ];

                for (let notice of loadedNotices) {
                    // Authoured Messages
                    // First message related to this recipient
                    notices[`${notice.id}`] = notice;

                    if (notice.read === false) {
                        let latestTime = notice.update_time;
                        if (
                            notifications[`notifynotice${notice.id}`] !==
                            undefined
                        ) {
                            latestTime =
                                latestTime >
                                notifications[`notifynotice${notice.id}`].time
                                    ? latestTime
                                    : notifications[`notifynotice${notice.id}`]
                                          .time;
                        }
                        notifications[`notifynotice${notice.id}`] = {
                            title: `New notice in InstiBoard !!`,
                            id: `notifynotice${notice.id}`,
                            link: `${LinkConstants.singleInstiBoardNotice}/${notice.id}`,
                            time: latestTime,
                            content: `${notice.subject}`,
                            sender: `${notice.author}`,
                        };
                    }
                }

                let loadedPositions = response.data.positions;
                // this will be array of the positions releadsed/created (the type depends on the userr tpy)
                // let loadedPositions = [
                //     {
                // id: 1,
                // position_title: "position_title",
                // description: "description",
                // company: "Syska",
                // company_id: 2,
                // CTC: 10000000,
                // depts: "CS, EC, EE, ME",
                // degrees: "BT, DD, MT",
                // create_time: 789654234,
                // release_time: null,
                // deadline: 956454789,
                // update_time: 942456321,
                // read: true,
                //     },
                //     {
                //         id: 2,
                //         position_title: "position_title 2",
                //         description: "description 2",
                //         company: "Syska 2",
                //         company_id: 4,
                //         CTC: 10000000,
                //         depts: "CS, EC, CE, ME",
                //         degrees: "BT, DD, MT",
                //         create_time: 789589634,
                //         release_time: 942401943,
                //         deadline: 956459630,
                //         update_time: 942015421,
                //         read: true,
                //     },
                //     {
                //         id: 3,
                //         position_title: "position_title 3",
                //         description: "description 3",
                //         company: "Syska3 ",
                //         company_id: 4,
                //         CTC: 10000000,
                //         depts: "CS, EC, CE, ME",
                //         degrees: "BT, DD, MT",
                //         create_time: 789589334,
                //         release_time: 942403943,
                //         deadline: 956459633,
                //         update_time: 942015431,
                //         read: false,
                //     },
                // ];

                for (let position of loadedPositions) {
                    if (
                        current_u_type === "student" ||
                        current_u_type === "alumni"
                    ) {
                        positions[`${position.id}`] = position;
                        if (position.read === false) {
                            notifications[`notifyposition${position.id}`] = {
                                title: `New position released ${position.position_title} !!`,
                                id: `notifyposition${position.id}`,
                                link: `${LinkConstants.singleJobPosition}/${position.id}`,
                                time: position.release_time,
                                content: `${position.description}`,
                                sender: `${position.company}`,
                            };
                        }
                    }
                    if (current_u_type === "instiadmin") {
                        if (position.release_time === null) {
                            unreleasedpositions[`${position.id}`] = position;
                        }
                        positions[`${position.id}`] = position;
                        if (position.read === false) {
                            notifications[`notifyposition${position.id}`] = {
                                title: `New position created ${position.position_title} !!`,
                                id: `notifyposition${position.id}`,
                                link: `${LinkConstants.singleJobPosition}/${position.id}`,
                                time: position.create_time,
                                content: `${position.description}`,
                                sender: `${position.company}`,
                            };
                        }
                    }
                    if (current_u_type === "recruiter") {
                        positions[`${position.id}`] = position;
                        if (position.read === false) {
                            let latestTime = position.update_time;
                            if (
                                notifications[
                                    `notifyposition${position.id}`
                                ] !== undefined
                            ) {
                                latestTime =
                                    latestTime >
                                    notifications[
                                        `notifyposition${position.id}`
                                    ].time
                                        ? latestTime
                                        : notifications[
                                              `notifyposition${position.id}`
                                          ].time;
                            }
                            notifications[`notifyposition${position.id}`] = {
                                title: `New applications for: ${position.position_title} !!`,
                                id: `notifyposition${position.id}`,
                                link: `${LinkConstants.singleJobPosition}/${position.id}`,
                                time: latestTime,
                                content: `${position.description}`,
                                sender: `${position.company}`,
                            };
                        }
                    }
                }

                let loadedApplications = response.data.applications;
                // this will be array of the positions releadsed/created (the type depends on the userr tpy)
                // let loadedApplications = [
                //     {
                //         id: 1,
                //         position_id: 2,
                //         company: "Samsung",
                //         status: 1,
                //         dept: "CS",
                //         degree: "MT",
                //         cgpa: 9.22,
                //         time: 789654234,
                //         update_time: 942456321,
                //         read: true,
                //     },
                //     {
                //         id: 2,
                //         position_id: 3,
                //         company: "Ola",
                //         status: 2,
                //         dept: "CS",
                //         degree: "MT",
                //         cgpa: 9.22,
                //         time: 789654234,
                //         update_time: 942456321,
                //         read: false,
                //     },
                // ];

                for (let application of loadedApplications) {
                    applications[`${application.id}`] = application;

                    if (current_u_type === "student") {
                        if (application.read === false) {
                            let title;
                            if (application.status === 1) {
                                title =
                                    "Your application is accepted for " +
                                    positions[`${application.position_id}`]
                                        .position_title +
                                    " !!";
                            } else if (application.status === 2) {
                                title =
                                    "Your application is rejected for " +
                                    positions[`${application.position_id}`]
                                        .position_title +
                                    " !!";
                            }
                            notifications[
                                `notifyapplication${application.id}`
                            ] = {
                                title: title,
                                id: `notifyapplication${application.id}`,
                                link: `${LinkConstants.singleApplication}/${application.id}`,
                                time: application.update_time,
                                content: ``,
                                sender: `${application.company}`,
                            };
                        }
                    }
                }

                dispatch({
                    type: actionTypes.LOAD_INFORMATION,
                    payload: {
                        messages: messages,
                        notices: notices,
                        notifications: notifications,
                        positions: positions,
                        unreleasedpositions: unreleasedpositions,
                        applications: applications,
                    },
                });
                setTimeout(() => {
                    if (
                        JSON.parse(localStorage.getItem("authToken")) !==
                            undefined &&
                        JSON.parse(localStorage.getItem("authToken")) !== null
                    ) {
                        dispatch(getData());
                    }
                }, 1000 * 5);
            })
            .catch((error) => {});
    };
};

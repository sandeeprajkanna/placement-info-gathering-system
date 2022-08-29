import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators.js";
import classes from "./MessageBox.module.css";
import MainFrame from "../../Components/UI/MainFrame/MainFrame";
import dateFromStamp from "../../DateFromStamp.js";

class MessageBox extends React.Component {
    state = {
        username: "",
        content: "",
        unreadMessages: {},
    };

    componentDidMount() {
        document.title = "MessageBox | PlaceMentor";
    }

    markAsRead = () => {
        for (let i of this.state.unreadMessages) {
            this.props.markAsRead("message", i);
        }
    };

    pushUnreadMessages = (userMsgsSet, unreadMessages) => {
        // this.setState({
        //     ...this.state,
        //     unreadMessages: {
        //         ...this.state.unreadMessages,
        //         [userMsgsSet]: unreadMessages,
        //     },
        // });
    };

    render() {
        let userSets = [];
        let read = true;
        let unreadMessages = [];
        for (let userMsgsSet in this.props.messages) {
            let userMessages = [];
            for (let userMsg in this.props.messages[userMsgsSet]) {
                let userMsg_ = this.props.messages[userMsgsSet][userMsg];
                read = read && userMsg_.read;
                if (!userMsg_.read) {
                    this.props.markAsRead("message", userMsg_.id);
                    this.props.removeMessageNotification(userMsgsSet);
                }
                userMessages.unshift(
                    <div
                        key={`${userMsg_.id}`}
                        className={[
                            classes.noticeBox,
                            userMsg_.author === this.props.username
                                ? classes.is_sent
                                : classes.is_recieved,
                        ].join(" ")}
                    >
                        <div className={classes.insider}>
                            <div className={classes.header}>
                                <div className={classes.title}>
                                    {userMsg_.author === this.props.username
                                        ? "You"
                                        : userMsg_.author}
                                </div>
                                <div className={classes.time}>
                                    {dateFromStamp(userMsg_.time)}
                                </div>
                            </div>
                            <div className={classes.message}>
                                {userMsg_.content}
                            </div>
                        </div>
                    </div>
                );
            }
            userSets.push(
                <div key={userMsgsSet} className={classes.msgBlocks}>
                    <div className={classes.username}>{userMsgsSet}</div>
                    {userMessages}
                </div>
            );
            this.pushUnreadMessages(userMsgsSet, unreadMessages);
            // this.state.unreadMessages;
        }

        return (
            <MainFrame>
                <h2>Message Box</h2>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            username: e.target.value,
                        });
                    }}
                    value={this.state.username}
                    className={classes.subjectInput}
                    placeholder="Username"
                />
                <textarea
                    name="content"
                    name=""
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            content: e.target.value,
                        });
                    }}
                    value={this.state.content}
                    className={classes.subjectInput}
                    placeholder="Message Content"
                ></textarea>
                <button
                    onClick={() => {
                        this.props.writeMessage(
                            this.state.username,
                            this.state.content
                        );
                        this.setState({
                            ...this.state,
                            username: "",
                            content: "",
                        });
                    }}
                >
                    Send
                </button>
                {userSets}
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        username: state.username,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        writeMessage: (uname, content) => {
            dispatch(actionCreators.createMessage(uname, content));
        },
        markAsRead: (type, id) => {
            dispatch(actionCreators.markAsRead(type, id));
        },
        removeMessageNotification: (author) => {
            dispatch(actionCreators.removeMessageNotification(author));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);

import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";

import MainFrame from "../../../Components/UI/MainFrame/MainFrame";

import classes from "./NoticeReader.module.css";
import * as actions from "../../../store/actions/actionCreators";

class noticeReader extends React.Component {
    componentDidMount() {
        let noticeId = this.props.match.params.id;
        let notice = this.props.notices[`${noticeId}`];

        if (notice !== undefined) {
            document.title = notice.title;
        }
    }

    render() {

        let notice = this.props.notices[`${this.props.match.params.id}`];
        if (notice.read === false) {
            this.props.markAsRead(notice.id);
        }

        if (notice === undefined) {
            return <Redirect to="/" />;
        }

        return (
            <MainFrame>
                <div
                    className={[
                        classes.notice,
                        this.props.special ? classes.special : "",
                    ].join(" ")}
                >
                    <div className={classes.header}>
                        <div className={classes.title}>{notice.subject}</div>
                        <div className={classes.time}>{notice.time}</div>
                    </div>
                    <div className={classes.sender}>{notice.author}</div>
                    <div className={classes.message}>{notice.content}</div>
                </div>
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notices: state.notices,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        markAsRead: (noticeId) =>
            dispatch(actions.markAsRead("notice", noticeId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(noticeReader));

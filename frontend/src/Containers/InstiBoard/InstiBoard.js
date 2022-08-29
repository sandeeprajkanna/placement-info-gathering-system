import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators";

import * as LinkConstants from "../../LinkNames";

import classes from "./InstiBoard.module.css";
import MainFrame from "../../Components/UI/MainFrame/MainFrame";
import Notice from "./Notice/Notice";

class InstiBoard extends React.Component {
    componentDidMount() {
        document.title = "PlaceMentor | InstiBoard";
    }

    render() {
        let notices = [];
        let notice_objs = [];
        for (let notice_id in this.props.notices) {
            this.props.notices[notice_id]["is_position"] = false;
            notice_objs.push(this.props.notices[notice_id]);
        }
        for (let position_id in this.props.positions) {
            
            this.props.positions[position_id]["is_position"] = true;
            this.props.positions[position_id]["time"] = this.props.positions[
                position_id
            ].release_time;
            if (this.props.positions[position_id].release_time !== null)
                notice_objs.push(this.props.positions[position_id]);
        }

        notice_objs = notice_objs.sort((a, b) => {
            return a.time < b.time ? 1 : -1;
        });
        for (let notice of notice_objs) {
            notices.push(
                <Link
                    key={(notice.is_position ? "p" : "n") + notice.id}
                    to={
                        notice.is_position
                            ? `${LinkConstants.singleJobPosition}/${notice.id}`
                            : `${LinkConstants.singleInstiBoardNotice}/${notice.id}`
                    }
                    className={classes.blockLinks}
                >
                    {!notice.is_position ? (
                        <Notice
                            title={notice.subject}
                            time={notice.time}
                            message={notice.content}
                            sender={notice.author}
                            unread={!notice.read}
                            is_position={false}
                        />
                    ) : (
                        <Notice
                            title={notice.position_title}
                            time={notice.time}
                            message={notice.description}
                            sender={notice.company}
                            unread={!notice.read}
                            is_position={true}
                        />
                    )}
                </Link>
            );
        }

        let createNoticeLink = null;
        if (this.props.userType === "instiadmin") {
            createNoticeLink = (
                <Link to="createNotice" className={classes.createNotice}>
                    Create Notice
                </Link>
            );
        }

        return (
            <MainFrame>
                {createNoticeLink}
                <h2>Institute Board</h2>
                {notices}
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notices: state.notices,
        positions: state.positions,
        userType: state.userType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getdata: () => dispatch(actionCreators.getData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstiBoard);

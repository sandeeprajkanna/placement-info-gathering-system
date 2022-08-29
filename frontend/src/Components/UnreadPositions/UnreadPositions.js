import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/actionCreators";
import * as LinkConstants from "../../LinkNames";

import MainFrame from "../UI/MainFrame/MainFrame";
import Notice from "../../Containers/InstiBoard/Notice/Notice";

import classes from "./UnreadPositions.module.css";

class UnreadPositions extends React.Component {
    componentDidMount() {
        document.title = "PlaceMentor | Unreleased Positions";
    }

    render() {
        let notices = [];
        let notice_objs = [];
        for (let position_id in this.props.positions) {
            this.props.positions[position_id]["is_position"] = true;
            this.props.positions[position_id]["time"] = this.props.positions[
                position_id
            ].create_time;
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
 
        return (
            <MainFrame> 
                <h2>Unreleased Positions</h2>
                {notices}
            </MainFrame>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notices: state.notices,
        positions: state.unreleasedpositions,
        userType: state.userType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getdata: () => dispatch(actionCreators.getData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnreadPositions);

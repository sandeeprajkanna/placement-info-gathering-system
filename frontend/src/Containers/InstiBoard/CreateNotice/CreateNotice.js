import classes from "./CreateNotice.module.css";
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actionCreators.js";

import MainFrame from "../../../Components/UI/MainFrame/MainFrame";
import { Redirect } from "react-router";

class CreateNotice extends React.Component {
    state = {
        subject: "",
        content: "",
        submitted: false,
    };

    componentDidMount() {
        document.title = "Create Notice | PlaceMentor";
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to="instiboard" />;
        }
        return (
            <MainFrame>
                <h2>Notice Writer Box</h2>
                <input
                    type="text"
                    name="subject"
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            subject: e.target.value,
                        });
                    }}
                    value={this.state.subject}
                    className={classes.subjectInput}
                    placeholder="Subject"
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
                    className={classes.contentInput}
                    placeholder="Content"
                ></textarea>
                <button
                    onClick={() => {
                        this.props.writeNotice(
                            this.state.subject,
                            this.state.content
                        );
                        this.setState({
                            ...this.state,
                            submitted: true
                        })
                    }}
                >
                    Submit
                </button>
            </MainFrame>
        );
    }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return {
        writeNotice: (uname, content) => {
            dispatch(actionCreators.createNotice(uname, content));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotice);

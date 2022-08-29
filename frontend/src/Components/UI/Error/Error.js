import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/actionCreators";

import classes from "./Error.module.css";

class ErrorDisplay extends React.Component {
    render() {
        if (this.props.errorMsg !== null) {
            return (
                <div className={classes.ErrorDisplay}>
                    <div className={classes.errorMsg}>
                        {this.props.errorMsg}
                        {!this.props.errorMsg.startsWith("Network") ? (
                            <button
                                className={classes.ok}
                                onClick={this.props.clearError}
                            >
                                Ok
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        errorMsg: state.errorMsg,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(actionCreators.clearError()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay);

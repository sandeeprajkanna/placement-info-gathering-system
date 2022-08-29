import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../../../../store/actions/actionCreators";
import classes from "./SearchBar.module.css";

class SearchBar extends React.Component {
    state = {
        username: "",
        searched: false,
    };
    render() {
        return (
            <div className={classes.searchBar}>
                @
                <input
                    type="text"
                    className={classes.searchInput}
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            username: e.target.value,
                        });
                    }}
                />
                <button
                    className={classes.searchBtn}
                    onClick={() => {
                        if (this.state.username !== "") {
                            this.props.searchUsers(this.state.username);
                        }
                        this.setState({ ...this.state, searched: true });
                    }}
                >
                    <Link to="/searchedusers" className={classes.blockLink}>Go</Link>
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchUsers: (string) =>
            dispatch(actionCreators.fetchUserNames(string)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

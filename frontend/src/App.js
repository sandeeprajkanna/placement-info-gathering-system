import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/actionCreators";

import classes from "./App.module.css";

import Content from "./Components/UI/Content/Content";
import MessageBox from "./Containers/MessageBox/MessageBox";
import InstiBoard from "./Containers/InstiBoard/InstiBoard";
import MyApplications from "./Components/MyApplications/MyApplications";
import JobProfiles from "./Components/JobProfiles/JobProfiles";
import Wrap from "./hoc/Wrap/Wrap"; 
import NoticeReader from "./Containers/InstiBoard/NoticeReader/NoticeReader";
import JobPosition from "./Containers/JobPosition/JobPosition";
import ViewApplication from "./Components/ViewApplication/ViewApplication";
import UserProfile from "./Components/UserProfile/UserProfile";

import Login from "./Containers/Auth/Login/Login";
import UpdateProfile from "./Containers/UpdateProfile/UpdateProfile";
import Register from "./Containers/Auth/Register/Register";
import Logout from "./Containers/Auth/Logout/Logout";
import CreateNotice from "./Containers/InstiBoard/CreateNotice/CreateNotice";
import CreatePosition from "./Containers/JobPosition/CreatePosition/CreatePosition";
import SearchedNames from "./Components/SearchedNames/SearchedNames";
import ErrorDisplay from "./Components/UI/Error/Error";
import UnreadPositions from "./Components/UnreadPositions/UnreadPositions";

class App extends React.Component {
    state = {
        stakeholder_type: "student",
    };
    componentDidMount() {
        this.props.autoLogin();
        this.props.getdata();
    }
    render() {
        let Routes = "No proper stake holder type.";
        switch (this.props.usertype) {
            case "student":
                Routes = (
                    <Switch>
                        <Route
                            path="/instiboard"
                            exact
                            component={InstiBoard}
                        />
                        <Route
                            path="/instiBoard/:id"
                            component={NoticeReader}
                        />
                        <Route
                            path="/myapplications"
                            component={MyApplications}
                        />
                        <Route
                            path="/application/:id"
                            component={ViewApplication}
                        />
                        <Route
                            path="/my_profile"
                            component={UpdateProfile}
                        />
                        <Route
                            path="/jobposition/:id"
                            component={JobPosition}
                        />
                        <Route path="/messages" component={MessageBox} />
                        <Route
                            path="/searchedUsers"
                            exact
                            component={SearchedNames}
                        />
                        <Route
                            path="/profile/:username"
                            component={UserProfile}
                        />
                        <Route path="/logout" exact component={Logout} />
                        {/* <Route path="/login" exact component={Login} /> */}
                        <Redirect from="/" to="/instiboard" />
                    </Switch>
                );
                break;
            case "alumni":
                Routes = (
                    <Switch>
                        <Route
                            path="/instiboard"
                            exact
                            component={InstiBoard}
                        />
                        <Route
                            path="/instiBoard/:id"
                            component={NoticeReader}
                        />
                        <Route
                            path="/jobposition/:id"
                            component={JobPosition}
                        />
                        <Route path="/messages" component={MessageBox} />
                        <Route
                            path="/searchedUsers"
                            exact
                            component={SearchedNames}
                        />
                        <Route path="/my_profile" component={UpdateProfile} />
                        <Route
                            path="/profile/:username"
                            component={UserProfile}
                        />
                        <Route path="/logout" exact component={Logout} />
                        <Redirect from="/" to="/instiboard" />
                    </Switch>
                );
                break;
            case "instiadmin":
                Routes = (
                    <Switch>
                        <Route path="/messages" component={MessageBox} />
                        <Route
                            path="/instiboard"
                            exact
                            component={InstiBoard}
                        />
                        <Route
                            path="/instiBoard/:id"
                            component={NoticeReader}
                        />
                        <Route
                            path="/profile/:username"
                            component={UserProfile}
                        />
                        <Route
                            path="/recruiters"
                            exact
                            component={UnreadPositions}
                        /> 
                        <Route
                            path="/jobposition/:id"
                            component={JobPosition}
                        />
                        <Route
                            path="/createNotice"
                            exact
                            component={CreateNotice}
                        />
                        <Route
                            path="/searchedUsers"
                            exact
                            component={SearchedNames}
                        />
                        <Route path="/logout" exact component={Logout} />
                        <Redirect from="/" to="/instiboard" />
                    </Switch>
                );
                break;
            case "recruiter":
                Routes = (
                    <Switch>
                        <Route path="/messages" component={MessageBox} />
                        <Route
                            path="/profile/:username"
                            component={UserProfile}
                        />
                        <Route
                            path="/application/:id"
                            component={ViewApplication}
                        />
                        <Route path="/jobprofiles" component={JobProfiles} />
                        <Route
                            path="/jobposition/:id"
                            component={JobPosition}
                        />
                        <Route
                            path="/searchedUsers"
                            exact
                            component={SearchedNames}
                        />
                        <Route path="/logout" exact component={Logout} />
                        <Route
                            path="/createPosition"
                            component={CreatePosition}
                        />
                        <Redirect from="/" to="/jobprofiles" />
                    </Switch>
                );
                break;
            default:
                Routes = null;
        }
        return (
            <div /*className={classes.App}*/>
                <ErrorDisplay />
                <Content>
                    {this.props.usertype !== null ? (
                        Routes
                    ) : (
                        <Switch>
                            <Route path="/login" exact component={Login} />
                            <Route
                                path="/register"
                                exact
                                component={Register}
                            />
                            <Redirect from="/" to="/login" />
                        </Switch>
                    )}
                </Content>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usertype: state.userType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getdata: () => dispatch(actionCreators.getData()),
        autoLogin: () => dispatch(actionCreators.autoLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

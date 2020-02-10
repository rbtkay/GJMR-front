// modules
import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// components
import Login from "./login/Login";
import Logout from "./login/Logout";
import Dashboard from "./dashboard/Dashboard";
import Module from "./module/Module";

// import Module from "./module/Module";
import AddUser from "./admin/AddUser";
import AddModule from "./admin/AddModule";
import Page404 from "./Page404";
import AddSchoolYear from "./admin/AddSchoolYear";

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
                <Route path="/dashboard/:role">
                    <Dashboard/>
                </Route>
                <Route exact path="/modules/:id">
                    <Module/>
                </Route>
                <Route exact path="/admin/add-user/:role">
                    <AddUser />
                </Route>
                <Route exact path="/admin/add-module/">
                    <AddModule />
                </Route>
                <Route exact path="/admin/add-school-year/">
                    <AddSchoolYear />
                </Route>
                <Route exact path="/404">
                    <Page404/>
                </Route>
                <Route exact path="/">
                    {this.props.user ? <Redirect to={`/dashboard/${this.props.user.role}`} />  : <Redirect to={`/login`} />}
                </Route>
                <Route path="/">
                    <Redirect to={`/404`} />
                </Route>
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(Router));




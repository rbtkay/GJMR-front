// modules
import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// components
import Login from "./login/Login";
import Logout from "./login/Logout";
import Dashboard from "./dashboard/Dashboard";
// import Module from "./module/Module";
import Page404 from "./Page404";

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/logout">
                    <Logout/>
                </Route>
                <Route exact path="/dashboard/:role">
                    <Dashboard/>
                </Route>
                <Route exact path="/modules/:role/:id">
                    {/* <Module/> */}
                </Route>
                <Route exact path="/404">
                    <Page404/>
                </Route>
                {/* <Route exact path="/admin/modules"></Route>
                <Route exact path="/admin/students"></Route>
                <Route exact path="/admin/teachers"></Route>
                <Route exact path="/admin/school-years"></Route> */}
                {/* Redirection */}
                <Route path="/">
                    <Redirect to={`/404`} />
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Router);
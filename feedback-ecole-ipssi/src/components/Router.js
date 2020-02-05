// modules
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
// components
import Login from "./pages/Login";
import Logout from "./pages/Logout";

class Router extends Component {
    render() {
        return (
            <Switch>
                {/* Login */}
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/logout">
                    <Logout/>
                </Route>
                {/* Student */}
                <Route exact path="/student/dashboard"></Route>
                <Route exact path="/student/modules/:id"></Route>
                {/* Teacher */}
                <Route exact path="/teacher/dashboard"></Route>
                <Route exact path="/teacher/modules/:id"></Route>
                {/* Admin */}
                <Route exact path="/admin/dashboard"></Route>
                <Route exact path="/admin/modules"></Route>
                <Route exact path="/admin/students"></Route>
                <Route exact path="/admin/teachers"></Route>
                <Route exact path="/admin/school-years"></Route>
            </Switch>
        );
    }
}

export default withRouter(Router);
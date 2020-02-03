import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class userRouter extends Component {
    render() {
        return (
            <Switch>
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

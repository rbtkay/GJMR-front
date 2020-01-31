import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'




class userRouter extends Component {
    render(){
        return (
            <Switch>
                <Route exact path="/student/dashboard">
                </Route>

                <Route exact path="/student/modules/:id">
                </Route>

                <Route path="/teacher/dashboard">
                </Route>

                <Route path="/teacher/modules/:id">
                </Route>

                <Route path="/admin/">
                </Route>
            </Switch>
        );
    }
}
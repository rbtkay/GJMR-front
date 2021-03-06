// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// component
import DashboardAdmin from "./DashboardAdmin";
import DashboardStudent from "./DashboardStudent";
import DashboardTeacher from "./DashboardTeacher";

class Dashboard extends Component {
    UNSAFE_componentWillMount() {
        if (this.props.user.role !== this.props.match.params.role) {
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }
    }

    render() {
        return (
            <main className="dashboard">
                <h1>Tableau de Bord</h1>
                <Switch>
                    <Route exact path="/dashboard/student">
                        <DashboardStudent />
                    </Route>
                    <Route exact path="/dashboard/teacher">
                        <DashboardTeacher />
                    </Route>
                    <Route path="/dashboard/admin">
                        <DashboardAdmin />
                    </Route>
                    {/* Redirection */}
                    <Route path="/dashboard">
                        <Redirect to={`/dashboard/${this.props.user.role}`} />
                    </Route>
                </Switch>
            </main>
        );
    }
}
 
const mapStateToProps = state => {
    return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(Dashboard));

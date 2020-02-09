// module
import React, { Component, Fragment } from "react";
import {
    Link,
    NavLink,
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
// component
import ModuleList from "../admin/ModuleList";
import StudentList from "../admin/StudentList";
import TeacherList from "../admin/TeacherList";
import SchoolYearList from "../admin/SchoolYearList";

class DashboardAdmin extends Component {
    render() {
        return (
            <Fragment>
                <nav className="creation">
                    <ul>
                        <li>
                            <Link
                                to={`/admin/add-user/student`}
                                className="btn"
                            >
                                Ajouter un eleve
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/admin/add-user/teacher`}
                                className="btn"
                            >
                                Ajouter un intervenant
                            </Link>
                        </li>
                        <li>
                            <Link to={`/admin/add-module`} className="btn">
                                Ajouter un module
                            </Link>
                        </li>
                        <li>
                            <Link to={`/admin/add-school-year`} className="btn">
                                Ajouter une session
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav className="lists">
                    <ul>
                        <li>
                            <NavLink
                                to={`/dashboard/admin/modules`}
                                className="btn"
                            >
                                Modules
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard/admin/student`}
                                className="btn"
                            >
                                Étudiant
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard/admin/teacher`}
                                className="btn"
                            >
                                Intervenants
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/dashboard/admin/school-year`}
                                className="btn"
                            >
                                Promotions
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/dashboard/admin/modules">
                        <ModuleList />
                    </Route>
                    <Route exact path="/dashboard/admin/student">
                        <StudentList />
                    </Route>
                    <Route exact path="/dashboard/admin/teacher">
                        <TeacherList />
                    </Route>
                    <Route exact path="/dashboard/admin/school-year">
                        <SchoolYearList />
                    </Route>
                    {/* Redirection */}
                    <Route exact path="/dashboard/admin">
                        <ModuleList />
                    </Route>
                    <Route path="/dashboard/admin">
                        <Redirect to={`/404`} />
                    </Route>
                </Switch>
            </Fragment>
        );
    }
}

export default withRouter(DashboardAdmin);

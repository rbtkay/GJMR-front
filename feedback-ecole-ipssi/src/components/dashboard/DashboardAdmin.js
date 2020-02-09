// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// component
import ModuleTeaser from "../module/ModuleTeaser";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class DashboardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modules: null
        };

        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.getModules();
    }

    async getModules() {
        this.setState({ loading: true });
        const response = await request(`/modules`, this.props.user.token);
        console.log("modules", response);
        if (this.responseManagment(response)) {
            this.setState({ modules: response.result });
            this.getTeachersModules(response.result);
        }
        this.setState({ loading: false });
    }

    async getTeachersModules(modules) {
        let teachers_id = modules.map(module => module.teacher_id);
        teachers_id = teachers_id.filter(
            (id, i) => teachers_id.indexOf(id) === i
        ); // distinct
        const response = await request(`/users`, this.props.user.token, {
            method: "POST",
            body: teachers_id
        });
        if (this.responseManagment(response)) {
            if (response.result.length) {
                modules = modules.map(module => {
                    module.teacher = response.result.filter(
                        teacher => teacher._id === module.teacher_id
                    )[0];
                    return module;
                });
            }
            this.getNotesModules(modules);
            this.setState({ modules });
        }
    }

    async getNotesModules(modules) {
        let modules_id = modules.map(module => module._id);
        const response = await request(
            `/notes/modules`,
            this.props.user.token,
            {
                method: "POST",
                body: modules_id
            }
        );
        console.log('notes', response);
        if (this.responseManagment(response) && response.result.length) {
            modules = modules.map(module => {
                module.notes = response.result.filter(
                    note => note.module_id === module._id
                );
                module.average =
                    module.notes.reduce((sum, note) => sum + note.value, 0) /
                    module.notes.length;
                this.setState({ modules });
                return module;
            });
        }
    }

    render() {
        return (
            <section className="module-list">
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
                {this.state.loading ? (
                    <Loading />
                ) : this.state.modules.length ? (
                    <ul className="modules">
                        {this.state.modules.map((module, i) => (
                            <ModuleTeaser module={module} key={i} />
                        ))}
                    </ul>
                ) : null}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

const mapDispatchToProps = {
    setLog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DashboardAdmin)
);

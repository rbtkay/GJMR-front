// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import Table from "../Table";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class ModuleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modules: []
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
        console.log("notes", response);
        if (this.responseManagment(response) && response.result.length) {
            modules = modules.map(module => {
                module.notes = response.result.filter(
                    note => note.module_id === module._id
                );
                module.average = Math.round(
                    module.notes.reduce((sum, note) => sum + note.value, 0) /
                        module.notes.length
                );
                this.setState({ modules });
                return module;
            });
        }
    }

    async deleteModule(id) {
        const response = await request(
            `/modules/${id}`,
            this.props.user.token,
            {
                method: "DELETE"
            }
        );
        if (response.status === 201 || response.status === 200) {
            console.log("module supprimé");
            this.setState({
                modules: this.state.modules.filter(module => module._id !== id)
            });
            this.props.setLog({
                type: "success",
                message: "Module supprimé."
            });
        }
    }

    render() {
        return (
            <section className="module-list section-list">
                <h2>Liste des modules</h2>
                {this.state.loading ? (
                    <Loading />
                ) : this.state.modules.length ? (
                    <Table
                        className="modules table-list"
                        labels={["Nom", "Intervenant", "Moyenne", "Action"]}
                    >
                        {this.state.modules.map((module, i) => (
                            <tr key={i}>
                                <td>
                                    <a href={`/modules/${module._id}`}>
                                        {module.name}
                                    </a>
                                </td>
                                <td>
                                    {module.teacher
                                        ? `${module.teacher.first_name} ${module.teacher.last_name}`
                                        : null}
                                </td>
                                <td>{module.average ? module.average : "-"}</td>
                                <td>
                                    <button
                                        onClick={evt =>
                                            this.deleteModule(module._id)
                                        }
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
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
    connect(mapStateToProps, mapDispatchToProps)(ModuleList)
);

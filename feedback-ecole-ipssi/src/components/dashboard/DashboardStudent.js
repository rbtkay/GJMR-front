// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import ModuleNotation from "../module/ModuleNotation";
import Table from "../Table";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modules: [],
            school_year: null
        };

        this.responseManagment = responseManagment.bind(this);
        this.updateModule = this.updateModule.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.user.role !== this.props.match.params.role) {
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }
        this.getModules();
    }

    async getModules() {
        this.setState({ loading: true });
        const response = await request(
            `/school_year/student/${this.props.user._id}`,
            this.props.user.token
        );
        console.log("school year", response);
        if (this.responseManagment(response)) {
            const response_next = await request(
                `/module_in_schoolyear/${response.result.school_year_id}`,
                this.props.user.token
            );
            console.log("modules", response_next);
            if (this.responseManagment(response_next)) {
                this.setState({ modules: response_next.result });
                this.getTeachersModules(response_next.result);
            }
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
        console.log("teacherResponse", response);
        if (this.responseManagment(response)) {
            if (response.result.length) {
                modules = modules.map(module => {
                    module.teacher = response.result.filter(
                        teacher => teacher._id === module.teacher_id
                    )[0];
                    return module;
                });
            }
            this.setState({ modules });
        }
        // don't need teacher to get module note
        // but wait for result to don't override it
        this.getNotesModules(modules);
    }

    async getNotesModules(modules) {
        let modules_id = modules.map(module => module._id);
        console.log("modules_id", modules_id);
        const response = await request(
            `/notes/student/${this.props.user._id}`,
            this.props.user.token,
            {
                method: "POST",
                body: modules_id
            }
        );
        console.log("notes", response);
        if (this.responseManagment(response) && response.result.length) {
            modules = modules.map(module => {
                module.note = response.result.filter(
                    note => note.module_id === module._id
                )[0];
                this.setState({ modules });
                return module;
            });
        }
    }

    updateModule(note, module_id) {
        console.log("module update");
        this.setState(
            this.state.modules.map(module => {
                if (module._id === module_id) {
                    module.note = note;
                }
            })
        );
    }

    render() {
        return (
            <section className="module-list">
                <h2>Liste des modules</h2>
                {this.state.loading ? (
                    <Loading />
                ) : this.state.modules.length ? (
                    <Table
                        className="modules"
                        labels={["Nom", "Intervenant", "Note", "Appréciation"]}
                    >
                        {this.state.modules.map((module, i) => (
                            <ModuleNotation
                                module={module}
                                key={i}
                                refresh_note={
                                    module.note ? module.note.value : null
                                }
                                refresh_teacher={
                                    module.teacher ? module.teacher : null
                                }
                                updateModule={this.updateModule}
                            />
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
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);

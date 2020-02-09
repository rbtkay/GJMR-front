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

class DashboardTeacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modules: null
        };

        this.responseManagment = responseManagment.bind(this);
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
            `/modules/teachers/${this.props.user._id}`,
            this.props.user.token
        );
        console.log("modules", response);
        if (this.responseManagment(response)) {
            this.setState({ modules: response.result });
            this.getNotesModules(response.result);
        }
        this.setState({ loading: false });
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
                {this.state.loading ? (
                    <Loading />
                ) : this.state.modules.length ? (
                    <Table className="modules" labels={["Nom", "Moyenne"]}>
                        {this.state.modules.map((module, i) => (
                            <tr key={i}>
                            <td>
                                <a href={`/modules/${module._id}`}>
                                    {module.name}
                                </a>
                            </td>
                                <td>{module.average ? module.average : "-"}</td>
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
    connect(mapStateToProps, mapDispatchToProps)(DashboardTeacher)
);

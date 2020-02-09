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

class Module extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            module: null,
            teacher: null,
            notes: []
        };

        this.responseManagment = responseManagment.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.getModule();
        this.getNotesModules();
    }

    async getModule() {
        const response = await request(
            `/modules/${this.props.match.params.id}`,
            this.props.user.token
        );
        console.log("module", response);
        if (this.responseManagment(response)) {
            this.setState({ module: response.result });
            this.getTeacherModules(response.result);
        }
    }

    async getTeacherModules(module) {
        const { teacher_id } = module;
        const response = await request(`/users`, this.props.user.token, {
            method: "POST",
            body: [teacher_id]
        });
        if (this.responseManagment(response)) {
            this.setState({ teacher: response.result[0] });
        }
    }

    async getNotesModules() {
        this.setState({ loading: true });
        const response = await request(
            `/notes/modules`,
            this.props.user.token,
            {
                method: "POST",
                body: [this.props.match.params.id]
            }
        );
        console.log("notes", response);
        if (this.responseManagment(response) && response.result.length) {
            this.setState({ notes: response.result });
        }
        this.setState({ loading: false });
    }

    goBack(evt) {
        this.props.history.push(`/dashboard/${this.props.user.role}/`);
    }

    render() {
        return (
            <main className="module">
                <h1>
                    Notes du module {this.state.module ? this.state.module.name : null}
                </h1>
                <button className="back-btn" onClick={this.goBack}>Retour</button>
                {this.state.teacher ? (
                    <p>
                        Intervenant&nbsp;: {this.state.teacher.first_name}{" "}
                        {this.state.teacher.last_name}
                    </p>
                ) : null}
                {this.state.loading ? (
                    <Loading />
                ) : this.state.notes.length ? (
                    <Table className="notes" labels={["Note", "Appréciation"]}>
                        {this.state.notes.map((note, i) => (
                            <tr key={i}>
                                <td>{note.value}</td>
                                <td>{note.comment}</td>
                            </tr>
                        ))}
                    </Table>
                ) : null}
            </main>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

const mapDispatchToProps = {
    setLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Module));

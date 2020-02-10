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

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            students: []
        };

        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.getStudents();
    }

    async getStudents() {
        this.setState({ loading: true });
        const response = await request(
            `/users/role/student`,
            this.props.user.token
        );
        console.log("students", response);
        if (this.responseManagment(response)) {
            this.setState({ students: response.result });
        }
        this.setState({ loading: false });
    }

    async deleteStudent(id) {
        const response = await request(`/user/${id}`, this.props.user.token, {
            method: "DELETE"
        });
        if (response.status === 201 || response.status === 200) {
            console.log("utilisateur supprimé");
            this.setState({
                students: this.state.students.filter(
                    student => student._id !== id
                )
            });
        }
    }

    render() {
        return (
            <section className="student-list section-list">
                <h2>Liste des étudiants</h2>
                {this.state.loading ? (
                    <Loading />
                ) : this.state.students.length ? (
                    <Table
                        className="students table-list"
                        labels={["Nom", "Prénom", "Email", "Action"]}
                    >
                        {this.state.students.map((student, i) => (
                            <tr key={i}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button
                                        onClick={evt =>
                                            this.deleteStudent(student._id)
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
    connect(mapStateToProps, mapDispatchToProps)(StudentList)
);

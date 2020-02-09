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

    render() {
        return (
            <section className="student-list">
                {this.state.loading ? (
                    <Loading />
                ) : this.state.students.length ? (
                    <Table
                        className="students"
                        labels={["Nom", "Prénom", "Email"]}
                    >
                        {this.state.students.map((student, i) => (
                            <tr key={i}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.email}</td>
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

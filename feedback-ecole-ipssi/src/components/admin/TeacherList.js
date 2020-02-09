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

class TeacherList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            teachers: []
        };

        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.getTeachers();
    }

    async getTeachers() {
        this.setState({ loading: true });
        const response = await request(
            `/users/role/teacher`,
            this.props.user.token
        );
        console.log("teachers", response);
        if (this.responseManagment(response)) {
            this.setState({ teachers: response.result });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <section className="teacher-list">
                {this.state.loading ? (
                    <Loading />
                ) : this.state.teachers.length ? (
                    <Table
                        className="teachers"
                        labels={["Nom", "Prénom", "Email"]}
                    >
                        {this.state.teachers.map((teacher, i) => (
                            <tr key={i}>
                                <td>{teacher.first_name}</td>
                                <td>{teacher.last_name}</td>
                                <td>{teacher.email}</td>
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
    connect(mapStateToProps, mapDispatchToProps)(TeacherList)
);

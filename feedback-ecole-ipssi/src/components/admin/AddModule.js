// modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// components
import Form from "../form/Form";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class AddModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            select_school_years: [],
            select_teachers: []
        };

        this.responseManagment = responseManagment.bind(this);
    }

    async UNSAFE_componentWillMount() {
        this.setState({ loading: true });
        let options_school_year = [];
        let options_teacher = [];

        const response_school_year = await request(
            `/school-year`,
            this.props.user.token
        );
        console.log(response_school_year);
        if (this.responseManagment(response_school_year)) {
            options_school_year = response_school_year.result;
        }
        const response_teachers = await request(
            `/users/role/teacher`,
            this.props.user.token
        );
        console.log(response_teachers);
        if (this.responseManagment(response_teachers)) {
            options_school_year = response_teachers.result;
        }

        this.setState({
            loading: false,
            select_school_years: options_school_year,
            select_teachers: options_teacher
        });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <main>
                    <h1>Nouveau Module</h1>
                    <Form
                        form_items={[
                            {
                                type: "text",
                                name: "name",
                                label: "Nom du module",
                                required: true
                            },
                            {
                                type: "select",
                                name: "school_year_id",
                                label: "Promotions",
                                options: this.state.select_school_years,
                                required: true
                            },
                            {
                                type: "select",
                                name: "teacher_id",
                                label: "Intervenant",
                                options: this.state.select_teachers,
                                required: true
                            }
                        ]}
                        callback={this.postModule}
                    />
                </main>
            );
        }
    }

    async postModule(value) {
        this.setState({ loading: true });
        console.log(value);
        // TODO: add token
        let response = await request(`/module`, this.props.user.token, {
            method: "POST",
            body: value
        });
        if (response.status === 201) {
            console.log("user inserted");
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }
        this.setState({ loading: false });
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(AddModule));

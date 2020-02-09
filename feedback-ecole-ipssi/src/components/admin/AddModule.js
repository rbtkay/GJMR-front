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
import { STORED_USER } from "../../constants/index";

class AddModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            select_school_years: [],
            select_teachers: []
        };

        this.responseManagment = responseManagment.bind(this);
        this.postModule = this.postModule.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.user.role !== 'admin') {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        this.getSelectsValues();
    }

    async getSelectsValues() {
        this.setState({ loading: true });
        let options_school_year = [];
        let options_teacher = [];

        console.log("getSelectsValues", this.props);

        const response_school_year = await request(
            `/school-year`,
            this.props.user.token
        );
        console.log('school-year', response_school_year);
        if (this.responseManagment(response_school_year)) {
            options_school_year = response_school_year.result;
        }
        const response_teachers = await request(
            `/users/role/teacher`,
            this.props.user.token
        );
        console.log('teachers', response_teachers);
        if (this.responseManagment(response_teachers)) {
            options_teacher = response_teachers.result;
        }

        this.setState({
            loading: false,
            select_school_years: options_school_year,
            select_teachers: options_teacher
        });
    }

    async postModule(body) {
        console.log("props on postModule", this.props)
        if (this.props.user.token == null)
            this.props.history.push(`/login`);

        let response = await request(`/modules`, this.props.user.token, {
            method: "POST",
            body
        });
        if (response.status === 201) {
            console.log("module inserted");
        } else if (response.status === 403) {
            localStorage.clear();
            this.props.history.push(`/login`);
        }
        this.setState({ loading: false });
    }

    goBack(evt) {
        this.props.history.push(`/dashboard/admin/`);
    }

    render() {
        return (
            <main>
                <h1>Nouveau Module</h1>
                <button className="back-btn" onClick={this.goBack}>Retour</button>
                {this.state.loading ?
                    <Loading />
                    :
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
                    />}
            </main>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

export default withRouter(connect(mapStateToProps, { setLog })(AddModule));

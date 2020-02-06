import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        console.log("add student Form ")
        console.log(this.props)

        this.addStudentToYear = this.addStudentToYear.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (!this.props.user) {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
    }

    

    render() {
        return (
            <main>
                <h1>Ajoute Nouvel etudiant</h1>
                <Form
                    form_items={[
                        {
                            type: "text",
                            name: "last_name",
                            label: "Nom",
                            required: true
                        },
                        {
                            type: "text",
                            name: "first_name",
                            label: "Prenom",
                            required: true
                        },
                        {
                            type: "text",
                            name: "email",
                            label: "Email",
                            required: true
                        },
                    ]}
                    callback={this.addStudentToYear}
                />
            </main>
        )
    }
    async addStudentToYear(form_result) {
        console.log(form_result);

        let new_student = {
            email: form_result['email'],
            last_name: form_result['last_name'],
            first_name: form_result['first_name'],
            role: "student"
        }

        //TODO: add token
        let response = await request(`/user`, { method: "POST", body: new_student });
        if (response.status === 201) {
            console.log("Student inserted");
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        // localStorage.getItem(STORED_USER);
    }

}

const mapStateToProps = state => {
    return { user: state.user };
};

const mapDispatchToProps = {
    setUser,
    setLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddStudent));


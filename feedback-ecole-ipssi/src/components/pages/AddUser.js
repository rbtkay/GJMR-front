import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select_options: null
        }

        this.addUser = this.addUser.bind(this);
    }

    async UNSAFE_componentWillMount() {
        if (!this.props.user) {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
    }

    render() {
        let title = window.location.href.split('-')[1] == 'student' ? "etudiant" : "intervenant";
        return (
            <main>
                <h1>Nouvel {title}</h1>
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
                    select_options={this.state.select_options}
                    callback={this.addUser}
                />

            </main >
        )
    }

    async addUser(form_result) {
        let user_role = window.location.href.split('-')[1]; //used to know what kind of user to add
        if (user_role != "teacher" && user_role != "student") this.props.history.push(`/login`)

        console.log(user_role)
        let new_user = {
            email: form_result['email'],
            last_name: form_result['last_name'],
            first_name: form_result['first_name'],
            role: user_role,
            school_year: form_result["select_options"]
        }
        //TODO: add token
        let response = await request(`/user`, { method: "POST", body: new_user });
        if (response.status === 201) {
            console.log("user inserted");
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        localStorage.getItem(STORED_USER);
    }

    async componentWillMount() {
        let response = await request(`/school-year`, { method: "GET" });
        console.log('response', response)
        let options = response.map(promo => {
            return promo["name"]
        })
        this.setState({ select_options: response });
    }

}

const mapStateToProps = state => {
    return { user: state.user };
};

const mapDispatchToProps = {
    setUser,
    setLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUser));


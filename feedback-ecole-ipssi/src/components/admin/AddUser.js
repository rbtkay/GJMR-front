import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';
import Loading from '../Loading';


class AddUser extends Component {
    constructor(props) {
        super(props);
        let user_role_url = window.location.href.split('/'); //used to know what kind of user to add
        this.state = {
            isLoading: true,
            user_role: user_role_url[user_role_url.length - 1]
        }

        this.addUser = this.addUser.bind(this);
    }

    async UNSAFE_componentWillMount() {
        // if (!this.props.user) {
        //     this.props.history.push(`/${this.props.user.role}/dashboard`);
        // }

        // if (this.state.user != "student") {
        //     this.setState({ isLoading: false, select_options: options });
        //     return;
        // }; //we don't need the schoolyears in case it is not a student 

        let response = await request(`/school-year`, null, { method: "GET" });

        this.setState({ isLoading: false, select_school_year: response.result });
    }

    render() {
        let title = this.state.user_role == 'student' ? "etudiant" : "intervenant";
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
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
                        select_role={this.state.user_role}
                        select_school_year={this.state.select_school_year}
                        callback={this.addUser}
                    />

                </main >
            )
        }
    }

    async addUser(form_result) {
        console.log("formresult", form_result)
        if (this.state.user_role != "teacher" && this.state.user_role != "student") this.props.history.push(`/login`)

        let new_user = {
            email: form_result['email'],
            last_name: form_result['last_name'],
            first_name: form_result['first_name'],
            role: this.state.user_role,
            school_year: form_result["select_school_year"]
        }
        console.log("new user", new_user);
        //TODO: add token
        let response = await request(`/user`, null, { method: "POST", body: new_user });
        console.log("response", response);
        if (response.status === 201 || response.status === 200) {
            console.log("user inserted");
            // this.props.history.push(`/${this.props.user.role}/dashboard`);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUser));


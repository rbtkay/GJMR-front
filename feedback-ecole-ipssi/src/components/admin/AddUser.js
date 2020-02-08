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
        this.state = {
            isLoading: true
        }

        this.addUser = this.addUser.bind(this);
    }

    async UNSAFE_componentWillMount() {
        if (!this.props.user) {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }

        if (window.location.href.split('-')[1] != "student") {
            this.setState({ isLoading: false, select_options: options });
            return;
        }; //we don't need the schoolyears in case it is not a student 

        let response = await request(`/school-year`, { method: "GET" });
        let options = response.result.map(promo => {
            return promo
        })
        this.setState({ isLoading: false, select_school_year: options });
    }

    render() {
        let title = window.location.href.split('-')[1] == 'student' ? "etudiant" : "intervenant";
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
                        select_role={window.location.href.split('-')[1]}
                        select_school_year={this.state.select_school_year}
                        callback={this.addUser}
                    />

                </main >
            )
        }
    }

    async addUser(form_result) {
        let user_role = window.location.href.split('-')[1]; //used to know what kind of user to add
        if (user_role != "teacher" && user_role != "student") this.props.history.push(`/login`)

        let new_user = {
            email: form_result['email'],
            last_name: form_result['last_name'],
            first_name: form_result['first_name'],
            role: user_role,
            school_year: form_result["select_school_year"]
        }
        console.log("new user", new_user);
        //TODO: add token
        let response = await request(`/user`, { method: "POST", body: new_user });
        console.log(response);
        if (response.status === 201 || response.status === 200) {
            console.log("user inserted");
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        localStorage.getItem(STORED_USER);
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


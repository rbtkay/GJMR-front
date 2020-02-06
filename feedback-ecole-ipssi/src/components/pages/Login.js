// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import jwt from 'jsonwebtoken';
// component
import Form from "../form/Form";
import Loading from "../Loading";
// actions
import { setUser, setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";
// const
import { STORED_USER } from "../../constants";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };

        this.connection = this.connection.bind(this);
        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.user) {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
    }

    // Use form values to get User information from API
    async connection(body) {
        this.setState({ loading: true });
        let response = await request(
            `/user/login`,
            undefined, 
            { method: "POST", body }
        );
        console.log(response);
        if (this.responseManagment(response)) {
            const user = response.result;
            this.props.setUser(user);
            localStorage.setItem(STORED_USER, JSON.stringify(user));
            this.props.history.push(`/${user.role}/dashboard`);
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <main className="login">
                <h1>Connexion</h1>
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <Form
                        form_items={[
                            {
                                type: "text",
                                name: "email",
                                label: "Identifiant",
                                required: true
                            },
                            {
                                type: "password",
                                name: "password",
                                label: "Mot de passe",
                                required: true
                            }
                        ]}
                        callback={this.connection}
                    />
                )}
            </main>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

const mapDispatchToProps = {
    setUser,
    setLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

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

class AddUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            select_school_years: []
        };

        this.responseManagment = responseManagment.bind(this);
        this.postUser = this.postUser.bind(this);
    }

    async UNSAFE_componentWillMount() {
        console.log(this.props.user.role);
        console.log(this.props.match.params.role);
        if (
            this.props.user.role !== "admin" ||
            (
                this.props.match.params.role !== "admin" &&
                this.props.match.params.role !== "student" &&
                this.props.match.params.role !== "teacher"
            )
        ) {
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }

        if (this.props.match.params.role === "student") {
            this.setState({ loading: true });
            const response = await request(
                `/school-year`,
                this.props.user.token
            );
            if (responseManagment(response)) {
                this.setState({ select_school_years: response.result });
            }
            this.setState({ loading: false });
        }
    }

    async postUser(body) {
        console.log(body);
        const response = await request(`/user`, this.props.user.token, {
            method: "POST",
            body
        });
        console.log("response", response);
        if (response.status === 201 || response.status === 200) {
            console.log("user inserted");
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }
    }

    render() {
        let form_items = [
            {
                type: "text",
                name: "last_name",
                label: "Nom",
                required: true
            },
            {
                type: "text",
                name: "first_name",
                label: "Prénom",
                required: true
            },
            {
                type: "text",
                name: "email",
                label: "Email",
                required: true
            },
            {
                type: "hidden",
                name: "role",
                value: this.props.match.params.role,
                required: true
            }
        ];
        if (this.state.select_school_years.length) {
            form_items.push({
                type: "select",
                name: "school_year_id",
                label: "Promotions",
                options: this.state.select_school_years,
                required: true
            });
        }

        return (
            <main>
                <h1>Nouvel {this.props.match.params.role}</h1>
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <Form form_items={form_items} callback={this.postUser} />
                )}
            </main>
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
    connect(mapStateToProps, mapDispatchToProps)(AddUser)
);

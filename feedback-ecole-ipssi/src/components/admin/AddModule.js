import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';
import Loading from '../Loading';
class AddModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    async UNSAFE_componentWillMount() {
        let response = await request(`/school-year`, { method: "GET" });
        let responseTeachers = await request(`/users/role/teacher`, { method: "GET" })
        let options_teacher = responseTeachers.result.map(teacher => {
            return teacher
        })
        console.log(responseTeachers)
        let options = response.result.map(promo => {
            return promo
        })
        this.setState({ isLoading: false, select_school_year: options, select_teacher: options_teacher });
    }

    render() {
        console.log("Add Module", this.state)
        if (this.state.isLoading) {
            return (
                <Loading />
            )
        } else {
            return (
                <main>
                    <h1>Nouveau Module</h1>
                    <Form
                        form_items={[
                            {
                                type: "text",
                                name: "module_title",
                                label: "Titre du module",
                                required: true
                            },
                        ]}
                        select_role={window.location.href.split('-')[1]}
                        select_school_year={this.state.select_school_year}
                        select_teacher={this.state.select_teacher}
                        callback={this.addModule}
                    />

                </main >
            )
        }
    }

    async addModule(form_result) {
        let new_module = {
            module_title: form_result['module_title'],
            school_year: form_result["select_school_year"],
            teacher_id: form_result["select_teacher"]
        }

        console.log("adding module", new_module);
        // TODO: add token
        let response = await request(`/module`, { method: "POST", body: new_module });
        if (response.status === 201) {
            console.log("user inserted");
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        localStorage.getItem(STORED_USER);
    }

}

export default AddModule;
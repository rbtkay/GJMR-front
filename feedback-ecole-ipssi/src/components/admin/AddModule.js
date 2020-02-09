import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';
import Loading from '../Loading';

import { API_URL } from "../../constants";

class AddModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };

        this.addModule = this.addModule.bind(this);
    }

    async UNSAFE_componentWillMount() {
        let response = await request(`/school-year`, { method: "GET" });
        let responseTeachers = await request(`/users/role/teacher`, { method: "GET" })
        let options_teacher = responseTeachers.result.map(teacher => {
            return teacher
        })
        let options = response.result.map(promo => {
            return promo
        })
        this.setState({ isLoading: false, select_school_year: options, select_teacher: options_teacher });
    }

    render() {
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
        let response = await request(`/modules`, null, { method: "POST", body: new_module });
        console.log("response", response)
        if (response.status === 201 || response.status === 200) {
            // this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        // localStorage.getItem(STORED_USER);
        // fetch(API_URL + '/modules', {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: new_module
        // }).then(result => {
        //     console.log(result);
        // })
    }

}

export default AddModule;
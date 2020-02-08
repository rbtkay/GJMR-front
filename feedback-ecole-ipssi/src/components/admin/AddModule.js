import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';
class AddModule extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
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
                    // select_options={this.state.select_options}
                    callback={this.addModule}
                />

            </main >
        )
    }

    async addModule(form_result) {
        let new_module = {
            title: form_result['module_title'],
            school_year: form_result["select_options"],
            teacher: form_result["select_option_teacher"]
        }
        //TODO: add token
        // let response = await request(`/user`, { method: "POST", body: new_module });
        // if (response.status === 201) {
        //     console.log("user inserted");
        //     this.props.history.push(`/${this.props.user.role}/dashboard`);
        // }
        // localStorage.getItem(STORED_USER);
    }

}

export default AddModule;
import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from '../form/Form'
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from '../../reducer/actions';
import Loading from '../Loading';

import { API_URL } from "../../constants";

class AddSchoolYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };

        // this.addModule = this.addModule.bind(this);
    }

    async UNSAFE_componentWillMount() {
        // let response = await request(`/school-year`, { method: "GET" });
        // let responseTeachers = await request(`/users/role/teacher`, { method: "GET" })
        // let options_teacher = responseTeachers.result.map(teacher => {
        //     return teacher
        // })
        // let options = response.result.map(promo => {
        //     return promo
        // })
        this.setState({ isLoading: false });
    }
    async addSchoolYear(form_result) {
        let new_school_year = {
            name: form_result['school_year_name'],
            start_date: form_result["start_date"],
            end_date: form_result["end_date"]
        }

        const response = await request(`/school-year`, null, {
            method: "POST",
            body: new_school_year
        });

        console.log(response)
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
                                name: "school_year_name",
                                label: "Nom de la session",
                                required: true
                            },
                            {
                                type: "date",
                                name: "start_date",
                                label: "date de debut de la session",
                                required: true
                            },
                            {
                                type: "date",
                                name: "end_date",
                                label: "date de fin de la session",
                                required: true
                            },
                        ]}
                        callback={this.addSchoolYear}
                    />

                </main >
            )
        }
    }


}

export default AddSchoolYear;
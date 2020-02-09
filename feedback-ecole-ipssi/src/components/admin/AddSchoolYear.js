import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from "../form/Form";
import { request } from "../../functions/fetch";
import { STORED_USER } from "../../constants";
import { setUser, setLog } from "../../reducer/actions";
import Loading from "../Loading";

import { API_URL } from "../../constants";

class AddSchoolYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };

        this.postSchoolYear = this.postSchoolYear.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    async UNSAFE_componentWillMount() {
        if (this.props.user.role !== "admin") {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        this.setState({ loading: false });
    }

    async postSchoolYear(form_result) {
        if (localStorage.getItem(STORED_USER) == null)
            this.props.history.push(`/login`);
        else {
            let new_school_year = {
                name: form_result["school_year_name"],
                start_date: form_result["start_date"],
                end_date: form_result["end_date"]
            };

            const token = JSON.parse(localStorage.getItem(STORED_USER)).token;
            const response = await request(`/school-year`, token, {
                method: "POST",
                body: new_school_year
            });
            if (response.status === 201) {
                console.log("schoolyear inserted");
            } else if (response.status === 403) {
                localStorage.clear();
                this.props.history.push(`/login`);
            }
            this.setState({ loading: false });
        }
    }

    goBack(evt) {
        this.props.history.push(`/dashboard/admin/`);
    }

    render() {
        return (
            <main>
                <h1>Nouveau Module</h1>
                <button className="back-btn" onClick={this.goBack}>
                    Retour
                </button>
                {this.state.loading ? (
                    <Loading />
                ) : (
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
                            }
                        ]}
                        callback={this.postSchoolYear}
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
    setLog
};

// export default AddSchoolYear;
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddSchoolYear)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Form from "../form/Form";
import { request } from "../../functions/fetch";
import { setLog } from "../../reducer/actions";
import Loading from "../Loading";


class AddSchoolYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.postSchoolYear = this.postSchoolYear.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.user.role !== 'admin') {
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }
    }

    async postSchoolYear(form_result) {
        this.setState({ loading: true });
        let new_school_year = {
            name: form_result["school_year_name"],
            start_date: form_result["start_date"],
            end_date: form_result["end_date"]
        };

        const response = await request(`/school-year`, this.props.user.token, {
            method: "POST",
            body: new_school_year
        });
        if (response.status === 201) {
            console.log("schoolyear inserted");
            this.props.setLog({
                type: "success",
                message: "Promotion ajoutée."
            });
        } else if (response.status === 403) {
            localStorage.clear();
            this.props.history.push(`/login`);
        }
        this.setState({ loading: false });
    }

    goBack(evt) {
        this.props.history.push(`/dashboard/admin/`);
    }

    render() {
        return (
            <main className="main-form">
                <h1>Nouvelle Session</h1>
                <a className="back-btn" href="#" onClick={this.goBack}>Retour</a>

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

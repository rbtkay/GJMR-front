// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import Table from "../Table";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class SchoolYearList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            school_years: []
        };

        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.getSchoolYears();
    }

    async getSchoolYears() {
        this.setState({ loading: true });
        const response = await request(`/school-year`, this.props.user.token);
        console.log("school-year", response);
        if (this.responseManagment(response)) {
            this.setState({ school_years: response.result });
        }
        this.setState({ loading: false });
    }

    async deleteSchoolYear(id) {
        const response = await request(
            `/school_year/${id}`,
            this.props.user.token,
            {
                method: "DELETE"
            }
        );
        if (response.status === 201 || response.status === 200) {
            console.log("session supprimée");
            this.setState({
                school_years: this.state.school_years.filter(
                    school_year => school_year._id !== id
                )
            });
        }
    }

    render() {
        return (
            <section className="school-year-list section-list">
                <h2>Liste des promotions</h2>
                {this.state.loading ? (
                    <Loading />
                ) : this.state.school_years.length ? (
                    <Table
                        className="school-years table-list"
                        labels={["Nom", "Date de début", "Date de fin", "Action"]}
                    >
                        {this.state.school_years.map((school_year, i) => (
                            <tr key={i}>
                                <td>{school_year.name}</td>
                                <td>{school_year.start_date}</td>
                                <td>{school_year.end_date}</td>
                                <td>
                                    <button
                                        onClick={evt =>
                                            this.deleteSchoolYear(
                                                school_year._id
                                            )
                                        }
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                ) : null}
            </section>
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
    connect(mapStateToProps, mapDispatchToProps)(SchoolYearList)
);

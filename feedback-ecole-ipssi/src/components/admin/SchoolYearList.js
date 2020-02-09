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

    render() {
        return (
            <section className="school-year-list">
                {this.state.loading ? (
                    <Loading />
                ) : this.state.school_years.length ? (
                    <Table
                        className="school-years"
                        labels={["Nom", "Date de début", "Date de fin"]}
                    >
                        {this.state.school_years.map((school_year, i) => (
                            <tr key={i}>
                                <td>{school_year.name}</td>
                                <td>{school_year.start_date}</td>
                                <td>{school_year.end_date}</td>
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

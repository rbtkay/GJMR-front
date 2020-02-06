// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// component
// import Form from '../form/Form';
import ModuleTeaser from "../ModuleTeaser";
import Loading from "../Loading";
// actions
import { setUser, setLog } from "../../reducer/actions";
// functions
import { request, responseManagment } from "../../functions/fetch";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modules: null
        };

        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.user.role !== this.props.match.params.role) {
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
        this.getModules();
    }

    async getModules() {
        this.setState({ loading: true });
        let response = await request(`/modules`, this.props.user.token);
        console.log(response);
        if (response) {
            this.setState({ modules: response });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <main className="dashboard">
                <h1>Tableau de Bord</h1>
                <section className="module-list">
                    {this.state.loading ? (
                        <Loading />
                    ) : this.state.modules.length ? (
                        <ul className="modules">
                            {this.state.modules.map((module, i) => (
                                <ModuleTeaser module={module} key={i} />
                            ))}
                        </ul>
                    ) : null}
                </section>
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);

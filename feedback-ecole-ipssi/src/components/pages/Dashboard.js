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
        const response = await request(`/modules`, this.props.user.token);
        console.log(response);
        if (this.responseManagment(response)) {
            this.setState({ modules: response.result });
            this.getTeachersModules(response.result);
        }
        this.setState({ loading: false });
    }

    async getTeachersModules(modules) {
        let teachers_id = modules.map(module => module.teacher_id);
        teachers_id = teachers_id.filter((id, i) => teachers_id.indexOf(id) === i); // distinct
        const response = await request(`/users`, this.props.user.token, {
            method: "POST",
            body: teachers_id
        });
        console.log(response);
        if (this.responseManagment(response)) {
            modules = modules.map(module => {
                module.teacher = response.result.filter(
                    teacher => teacher._id === module.teacher_id
                )[0];
                return module;
            });
            this.setState({ modules });
        }
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

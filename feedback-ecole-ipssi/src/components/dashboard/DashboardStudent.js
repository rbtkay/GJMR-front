// module
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// component
import ModuleNotation from "../module/ModuleNotation";
import Loading from "../Loading";
// actions
import { setLog } from "../../reducer/actions";
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
            this.props.history.push(`/dashboard/${this.props.user.role}`);
        }
        // this.getModules();
    }

    async getModules() {
        this.setState({ loading: true });
        // const response = await request(`"/school_year/student/${this.props.user._id}`, this.props.user.token);
        // const response = await request(`/modules/school_year/:school_year_id`, this.props.user.token);
        // const response = await request(`/modules/:module_id`, this.props.user.token);
        // console.log(response);
        // if (this.responseManagment(response)) {
        //     this.setState({ modules: response.result });
        //     this.getTeachersModules(response.result);
        // }
        this.setState({ loading: false });
    }

    async getTeachersModules(modules) {
        let teachers_id = modules.map(module => module.teacher_id);
        teachers_id = teachers_id.filter(
            (id, i) => teachers_id.indexOf(id) === i
        ); // distinct
        const response = await request(`/users`, this.props.user.token, {
            method: "POST",
            body: teachers_id
        });
        console.log(response);
        if (this.responseManagment(response)) {
            if (response.result.length) {
                modules = modules.map(module => {
                    module.teacher = response.result.filter(
                        teacher => teacher._id === module.teacher_id
                    )[0];
                    return module;
                });
            }
            this.getNotesModules(modules);
            this.setState({ modules });
        }
    }

    async getNotesModules(modules) {
        let modules_id = modules.map(module => module._id);
        console.log(modules_id);
        const response = await request(
            `/notes/student/${this.props.user._id}`,
            this.props.user.token,
            {
                method: "POST",
                body: modules_id
            }
        );
        console.log(response);
        if (this.responseManagment(response) && response.result.length) {
            modules = modules.map(module => {
                module.note = response.result.filter(
                    note => note.module_id === module._id
                )[0];
                this.setState({ modules });
                return module;
            });
        }
    }

    render() {
        return (
            <section className="module-list">
                {this.state.loading ? (
                    <Loading />
                ) : this.state.modules.length ? (
                    <ul className="modules">
                        {this.state.modules.map((module, i) => (
                            <ModuleNotation module={module} key={i} />
                        ))}
                    </ul>
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
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);

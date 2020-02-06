// module
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
// component
// import Form from '../form/Form';
// actions
import { setUser, setLog } from '../../reducer/actions';
// functions
import {request, responseManagment} from '../../functions/fetch'

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.responseManagment = responseManagment.bind(this);
    }

    UNSAFE_componentWillMount(){
        if(this.props.user.role !== this.props.match.params.role){
            this.props.history.push(`/${this.props.user.role}/dashboard`);
        }
    }

    render() {
        return (
            <main className="dashboard">
                <h1>Tableau de Bord</h1>
                <section className="module-list">
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = {
    setUser,
    setLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

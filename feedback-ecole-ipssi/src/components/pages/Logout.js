// modules
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// actions
import {removeUser} from '../../reducer';
// const
import { STORED_USER } from "../../constants";

class Logout extends Component {

    UNSAFE_componentWillMount() {
        this.props.removeUser();
        localStorage.removeItem(STORED_USER);
        this.props.history.push('/login');
    }

    render() {
        return (
            <main className="logout">
                <h1>Déconnexion</h1>
                {/* TODO : make a loading circle */}
            </main>
        );
    }
}

export default withRouter(connect(null, {removeUser})(Logout));
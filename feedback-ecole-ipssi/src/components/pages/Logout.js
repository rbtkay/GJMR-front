// modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// components
import Loading from "../Loading";
// actions
import { removeUser } from "../../reducer/actions";
// const
import { STORED_USER } from "../../constants";

class Logout extends Component {
    UNSAFE_componentWillMount() {
        this.props.removeUser();
        localStorage.removeItem(STORED_USER);
        this.props.history.push("/login");
    }

    render() {
        return (
            <main className="logout">
                <h1>Déconnexion</h1>
                <Loading />
            </main>
        );
    }
}

export default withRouter(connect(null, { removeUser })(Logout));

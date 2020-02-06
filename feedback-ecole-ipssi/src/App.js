// modules
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
// components
import Router from "./components/Router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
// actions
import { setUser, setLog } from './reducer/actions';
// const
import { STORED_USER } from "./constants";

class App extends Component {

    UNSAFE_componentWillMount() {
        const user = JSON.parse(localStorage.getItem(STORED_USER));
        if (!user) {
            if(this.props.location.pathname !== "/login"){
                this.props.history.push("/login");
            }
        }else{
            this.props.setUser(user);
        }
    }

    render() {
        return (
            <div className="app">
                {this.props.user ? <Header user={this.props.user} /> : null}
                <Router />
                <Footer />
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

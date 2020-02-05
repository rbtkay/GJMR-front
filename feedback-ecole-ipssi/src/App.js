// modules
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
// components
import Router from "./components/Router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
// actions
// import { setUser, setLog } from './reducer/actions';

class App extends Component {

    componentDidMount() {
        if (this.props.location.pathname !== "/login" && !this.props.user) {
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <div className="app">
                {this.props.user ? <Header user={this.props.user} /> : null}
                <Router user={this.props.user} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = {
    // setUser,
    // setLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// components
import Router from "./components/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
// actions
import { setUser, setLog, removeLog } from "./reducer/actions";
// const
import { STORED_USER } from "./constants";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            log_is_hiding: false
        };
    }

    UNSAFE_componentWillMount() {
        const user = JSON.parse(localStorage.getItem(STORED_USER));
        if (!user) {
            if (this.props.location.pathname !== "login") {
                this.props.history.push("/login");
            }
        } else {
            this.props.setUser(user);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // if (
        //     !this.props.user &&
        //     prevProps.location.pathname !== this.props.location.pathname &&
        //     this.props.location.pathname !== "login"
        // ) {
        //     this.props.history.push("/login");
        // }
        // Logs
        if (
            this.props.log &&
            (!prevProps.log || prevProps.log.message !== this.props.log.message)
        ) {
            // Start animation hide log
            setTimeout(() => {
                this.setState({ log_is_hiding: true });
            }, 4000);
        } else if (prevProps.log && !this.props.log) {
            // Reset log is hiding after log has been removed
            this.setState({ log_is_hiding: false });
        }
        if (
            prevState.log_is_hiding !== this.state.log_is_hiding &&
            this.state.log_is_hiding === true
        ) {
            // Remove log
            setTimeout(() => {
                this.props.removeLog();
            }, 300);
        }
    }

    render() {
        return (
            <div className="app">
                {this.props.user ? <Header user={this.props.user} /> : null}
                <Router />
                <Footer />
                {this.props.log ? (
                    <div
                        className={
                            "user-log-wrapper" +
                            (this.state.log_is_hiding ? " hidden" : "")
                        }
                    >
                        <span className={`user-log ${this.props.log.type}`}>
                            {this.props.log.message}
                        </span>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user, log: state.log };
};

const mapDispatchToProps = {
    setUser,
    setLog,
    removeLog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

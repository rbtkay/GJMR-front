// modules
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// components
import Router from "./components/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="App">
                {this.state.user ? <Header user={this.state.user} /> : null}
                <Router user={this.state.user} />
                <Footer />
            </div>
        );
    }
}

export default App;

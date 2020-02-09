// module
import React, { Component } from "react";
import PropTypes from "prop-types";
// component
import FormItem from "./FormItem";
import HiddenItem from "./HiddenItem";
import SelectItem from "./SelectItem";

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {};
        props.form_items.forEach(form_item => {
            this.initialState[form_item.name] =
                form_item.type === "hidden" ? form_item.value : "";
        });
        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt, name) {
        let nextState = {};
        nextState[name] = evt.target.value;
        this.setState(nextState);
    }

    resetInputs() {
        this.setState({ ...this.initialState });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.callback({ ...this.state });
        this.resetInputs();
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-item-list">
                    {this.props.form_items.map((form_item, i) => {
                        switch (form_item.type) {
                            case "hidden":
                                return <HiddenItem key={i} input={form_item} />;
                            case "select":
                                return (
                                    <SelectItem
                                        key={i}
                                        select={form_item}
                                        value={this.state[form_item.name] || ""}
                                        callback={this.handleChange}
                                    />
                                );
                            default:
                                return (
                                    <FormItem
                                        key={i}
                                        input={form_item}
                                        value={this.state[form_item.name] || ""}
                                        callback={this.handleChange}
                                    />
                                );
                        }
                    })}
                </div>
                <div className="submit-button-wrapper">
                    <button className="btn submit-button" type="submit">
                        Valider
                    </button>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    form_items: PropTypes.arrayOf(PropTypes.object).isRequired,
    callback: PropTypes.func.isRequired
};

export default Form;

// module
import React, { Component } from "react";
import PropTypes from "prop-types";
// component
import FormItem from "./FormItem";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.initialState = {};

        console.log(this.props);
        props.form_items.forEach(form_item => {
            this.initialState[form_item.name] = "";
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const input_name = evt.target.getAttribute("name");
        let nextState = {};
        nextState[input_name] = evt.target.value;
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
        let select_options = this.props.select_options;
        let options = <option>Choisir Une Promotion</option>;
        if (select_options != null) {
            options = select_options.map((opt) =>
                <option key={opt._id} value={opt._id}>
                    {opt.name}
                </option>
            );
        }
        return (
            <form className="form" id="formid" onSubmit={this.handleSubmit}>
                <div className="form-item-list">
                    {this.props.form_items.map((form_item, i) => (
                        <FormItem
                            key={i}
                            input={form_item}
                            value={this.state[form_item.name] || ""}
                            callback={this.handleChange}
                        />
                    ))}
                </div>
                {this.renderSelect(options)}
                <div className="submit-button-wrapper">
                    <button className="btn submit-button" type="submit">
                        Valider
                    </button>
                </div>
            </form>
        );
    }

    renderSelect(options) {
        if (window.location.href.split('-')[1] == 'student') {
            return (
                <div className="form-item-list">
                    <label>Promotions - </label>
                    <select name="select_options" onChange={this.handleChange}>
                        <option>-</option>
                        {options}
                    </select>
                </div>
            )
        } else {
            return
        }
    }
}

// Form.propTypes = {
//     form_items: PropTypes.arrayOf(PropTypes.object).isRequired,
//     select_options: PropTypes,
//     callback: PropTypes.func.isRequired
// };

export default Form;

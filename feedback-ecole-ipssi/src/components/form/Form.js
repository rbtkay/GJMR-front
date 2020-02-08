// module
import React, { Component } from "react";
import PropTypes from "prop-types";
// component
import FormItem from "./FormItem";
import SelectItem from "./SelectItem";

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.initialState = {};

        // console.log(this.props);
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
        // let select_options = this.props.select_options;
        // let options = <option>Choisir Une Promotion</option>;
        // if (select_options != null) {
        //     options = select_options.map((opt) =>
        //         <option key={opt._id} value={opt._id}>
        //             {opt.name}
        //         </option>
        //     );
        // }
        let select_name = "select_name"
        if (this.props.user_role == "student") {
            select_name = "select_school_year";
        }
        // else if (this.props.user_role == "student") {

        // }
        // else if (this.props.user_role == "student") {

        // }

        console.log("in the form ", this.props)
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
                {/* {this.renderSelect(options)} */}
                <SelectItem
                    select_role={this.props.select_role}
                    options_school_year={this.props.select_school_year}
                    options_teacher={this.props.select_teacher}
                    callback={this.handleChange}
                />
                <div className="submit-button-wrapper">
                    <button className="btn submit-button" type="submit">
                        Valider
                    </button>
                </div>
            </form>
        );
    }

    // renderSelect(options) {
    //     let user_role = window.location.href.split('-')[1];
    //     if (user_role == 'student') {
    //         return (
    //             <div className="form-item-list">
    //                 <label>Promotions - </label>
    //                 <select name="select_options" onChange={this.handleChange}>
    //                     <option>-</option>
    //                     {options}
    //                 </select>
    //             </div>
    //         )
    //     } else if (user_role == 'module') {
    //         return (
    //             <div>
    //                 <div className="form-item-list">
    //                     <label>Promotion - </label>
    //                     <select name="select_options" onChange={this.handleChange}>
    //                         <option>-</option>
    //                         {options}
    //                     </select>
    //                 </div>
    //                 <div className="form-item-list">
    //                     <label>Nom de l'intervenant - </label>
    //                     <select name="select_option_teacher" onChange={this.handleChange}>
    //                         <option>-</option>
    //                         {options}
    //                     </select>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         return
    //     }
    // }
}

// Form.propTypes = {
//     form_items: PropTypes.arrayOf(PropTypes.object).isRequired,
//     select_options: PropTypes,
//     callback: PropTypes.func.isRequired
// };

export default Form;

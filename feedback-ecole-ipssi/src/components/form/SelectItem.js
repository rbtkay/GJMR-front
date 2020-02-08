// module
import React from "react";
import PropTypes from "prop-types";

const SelectItem = props => {
    let select_role = props.select_role;
    let options = props.options_school_year;
    if (select_role == "student") {
        return (
            <div className="item-selector">
                <label htmlFor={props.id}>
                    Promotions
                </label>
                <select
                    name="select_school_year"
                    onChange={value => props.callback(value)}
                >
                    <option>-</option>
                    {options = options.map((opt) =>
                        <option key={opt._id} value={opt._id}>
                            {opt.name}
                        </option>
                    )}
                </select>
            </div>
        )

    } else if (select_role == "module") {
        console.log("module", props)
        let options_school_year = props.options_school_year;
        let options_teacher = props.options_teacher;
        return (
            <div>

                <div className="item-selector">
                    <label htmlFor={props.id}>
                        Promotions -
                    </label>
                    <select
                        name="select_school_year"
                        onChange={value => props.callback(value)}
                    >
                        <option>-</option>
                        {options = options_school_year.map((opt) =>
                            <option key={opt._id} value={opt._id}>
                                {opt.name}
                            </option>
                        )}
                    </select>
                </div>
                <div className="item-selector">
                    <label htmlFor={props.id}>
                        Intervenant -
                    </label>
                    <select
                        name="select_teacher"
                        onChange={value => props.callback(value)}
                    >
                        <option>-</option>
                        {options = options_teacher.map((opt) =>
                            <option key={opt._id} value={opt._id}>
                                {opt.last_name + " " + opt.first_name}
                            </option>
                        )}
                    </select>
                </div>
            </div>
        )
    }
    else {
        return null
    }
}


SelectItem.propTypes = {
    // input: PropTypes.object.isRequired,
    // callback: PropTypes.func.isRequired,
    // value: PropTypes.any.isRequired
};

export default SelectItem;

//module
import React from "react";
import PropTypes from "prop-types";

export function SelectItem(props) {
    return (
        <div className="select-item">
            <label htmlFor={props.select.id}>
                {props.select.label}
                {props.select.required ? "\u00A0*" : null}&nbsp;:
            </label>
            <select
                id={props.select.name}
                name={props.select.name}
                value={props.value}
                onChange={value => props.callback(value, props.select.name)}
            >
                {props.select.options.map((option, i) => (
                    <option key={i} value={option._id}>
                        {option.name
                            ? option.name
                            : `${option.last_name} ${option.first_name}`}
                    </option>
                ))}
            </select>
        </div>
    );
}

SelectItem.propTypes = {
    select: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
};

export default SelectItem;

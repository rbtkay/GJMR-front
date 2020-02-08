//module
import React from "react";
import PropTypes from "prop-types";

export function SelectorItem(props) {
    return (
        <div className="item-selector">
            <label htmlFor={props.id}>
                {props.label}{props.required ? "\u00A0*" : null}&nbsp;:
            </label>
            <select
                id={props.id}
                name={props.id}
                value={props.current}
                onChange={value => props.callback(value)}
            >
                {props.options.map((option, i) => (
                    <option key={i} value={i}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

SelectorItem.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    callback: PropTypes.func.isRequired
};

// module
import React from "react";
import PropTypes from "prop-types";

const FormItem = props => {
    let name = props.input.name;
    let type = props.input.type;
    let label = props.input.label;
    let required = props.input.required;

    return (
        <div className="form-item form-group">
            <label htmlFor={name} className={props.input.type}>
                {/* Add '*' to required input's label */}
                {label}{required ? "\u00A0*" : ""}
            </label>
            {props.input.type === "textarea" ? (
                <textarea
                    name={name}
                    id={name}
                    placeholder={props.input.placeholder}
                    onChange={evt => props.callback(evt, name)}
                    value={props.value}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={props.input.placeholder}
                    onChange={evt => props.callback(evt, name)}
                    value={props.value}
                    required={required}
                />
            )}
        </div>
    );
};

FormItem.propTypes = {
    input: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
};

export default FormItem;

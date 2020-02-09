// module
import React from "react";
import PropTypes from "prop-types";

const HiddenItem = props => (
    <input
        type={props.input.type}
        name={props.input.name}
        value={props.input.value}
        readOnly={true}
        required={true}
    />
);

HiddenItem.propTypes = {
    input: PropTypes.object.isRequired
};

export default HiddenItem;

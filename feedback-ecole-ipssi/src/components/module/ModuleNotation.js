//module
import React, { Fragment } from "react";

const ModuleNotation = props => (
    <li className="module">
        <span>{props.module.name}</span>
        {props.module.teacher ? (
            <span> {props.module.teacher.last_name}</span>
        ) : null}
        {props.module.note ? (
            <span> {props.module.note}</span>
        ) : (
            <Fragment>
                <button /* onClick */>Noter</button>
                <div className="hidden-form">{/* Set Form notation */}</div>
            </Fragment>
        )}
    </li>
);

export default ModuleNotation;

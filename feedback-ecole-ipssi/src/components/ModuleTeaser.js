//module
import React from "react";

const ModuleTeaser = props => (
    <li className="module">
        <span>{props.module.name}</span>
        {props.module.teacher ? (
            <span>{" "}{props.module.teacher.last_name}</span>
        ) : null}
    </li>
);

export default ModuleTeaser;
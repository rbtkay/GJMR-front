//module
import React from "react";

const Table = table => (
    <table className={table.className} cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                {table.labels.map(label => (
                    <th>{label}</th>
                ))}
            </tr>
        </thead>
        <tbody>{table.children}</tbody>
    </table>
);

export default Table;

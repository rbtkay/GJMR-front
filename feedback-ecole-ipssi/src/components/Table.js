//module
import React from "react";

const Table = table => (
    <table className={table.className} cellSpacing="0" cellPadding="0">
        <thead>
            <tr>
                {table.labels.map((label, i) => (
                    <th key={i}>{label}</th>
                ))}
            </tr>
        </thead>
        <tbody>{table.children}</tbody>
    </table>
);

export default Table;

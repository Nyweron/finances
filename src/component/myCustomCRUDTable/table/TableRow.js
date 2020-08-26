import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";

export const TableRow = props => {
  // console.log("TableRow", props)
  if (props.rows === undefined) {
    return null;
  }
  let rowsToReturn = props.rows.map(row => {
    return (
      <tr style={{ height: "115px" }} key={row.id}>
        {props.keys.map((key, i) => {
          if (row[key] !== undefined || row[key] !== null) {
            return (
              <td data-testid={row.id + "-" + i} key={row.id + "-" + i}>
                {row[key]?.toString()}
              </td>
            );
          }
          return <td data-testid={row.id + "-" + i} key={row.id + "-" + i} />;
        })}
        <td className="delete-item">
          <Button variant="danger" onClick={() => props.handleRemove(row.id)}>X</Button>
        </td>
        <td className="edit-item">
          <props.EditComponent row={row} handleEdit={props.handleEdit} />
        </td>
      </tr>
    );
  });

  return rowsToReturn;
};

TableRow.propTypes = {
  rows: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired
};

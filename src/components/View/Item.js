import React, { memo } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const isEqual = (prevprops, nextProps) => {
  if (prevprops.completed != nextProps.completed) {
    return false;
  }
  return true;
};

const Item = ({ id, title, completed, handleCheckbox, deleteTodo }) => {
  console.log("item rendered", id);

  const handleCheck = e => {
    e.persist();
    handleCheckbox(e, id);
  };
  const handleDelete = () => {
    deleteTodo(id);
  };
  return (
    <TableRow>
      <TableCell>
        <input type="checkbox" checked={completed} name="check" id="check" onChange={handleCheck} />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        {completed ? <CheckIcon style={{ color: green[500] }} /> : <ClearIcon style={{ color: red[500] }} />}
      </TableCell>
      <TableCell>
        <DeleteForeverIcon style={{ color: red[500] }} onClick={handleDelete} />
      </TableCell>
    </TableRow>
  );
};

export default memo(Item, isEqual);

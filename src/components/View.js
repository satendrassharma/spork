import React, { useEffect, useState } from "react";

import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { green, red } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function View() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Paper style={{ overflowX: "auto", minHeight: 100 }}>
      {loading && (
        <div
          style={{
            textAlign: "center",
            height: 50,
            padding: "20px 0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </div>
      )}

      {!loading && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Todos</TableCell>
              <TableCell>completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos &&
              todos.map(todo => (
                <TableRow key={todo.id}>
                  <TableCell />

                  <TableCell>{todo.title}</TableCell>
                  <TableCell>
                    {todo.completed ? (
                      <CheckIcon style={{ color: green[500] }} />
                    ) : (
                      <ClearIcon style={{ color: red[500] }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

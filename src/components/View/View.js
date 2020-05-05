import React, { useEffect, useState } from "react";

import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import Item from "./Item";
import TodoForm from "./TodoForm";

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

  const handleSubmitTodo = todo => {
    console.log(todo);
    // const nTodos = todos;
    // nTodos.unshift(todo);
    setTodos(ct => [todo, ...ct]);
  };

  const deleteTodo = id => {
    console.log(id);
    setTodos(ct => {
      return ct.filter(c => c.id !== id);
    });
  };
  const handleCheckbox = (e, id) => {
    console.log(e, id);
    setTodos(ct => {
      return ct.map(c => {
        if (c.id == id) {
          return { ...c, completed: !c.completed };
        }
        return c;
      });
    });
  };

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
        <>
          <TodoForm handleSubmitTodo={handleSubmitTodo} />

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
                  <Item
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    handleCheckbox={handleCheckbox}
                    deleteTodo={deleteTodo}
                  />
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </Paper>
  );
}

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ handleSubmitTodo }) => {
  const [todo, setTodo] = useState("");

  const handleChange = e => {
    setTodo(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (todo !== "") {
      const id = uuidv4();
      handleSubmitTodo({ id, title: todo, completed: false });
      setTodo("");
    }
  };

  return (
    <form action="#" onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
      <TextField type="text" onChange={handleChange} value={todo} />

      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;

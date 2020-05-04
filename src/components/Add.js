import React, { useState } from "react";
import { Card, CardContent, TextField, CardActions, Button, Grid } from "@material-ui/core";
import frontpageImg from "../assets/front.png";
import "./Login.css";

import { Snackbar, IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

export default function Add({ history }) {
  const [data, setData] = useState({
    name: "",
    email: ""
  });

  const [errors, setErrors] = useState({ name: false, email: false });
  const [showsnack, setShowSnack] = useState(false);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setData(currentData => ({ ...currentData, [name]: value }));
  };

  const validateForm = () => {
    const pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    //do validation
    const errors = {};
    if (data.name === "") {
      errors.name = true;
    }
    if (!pattern.test(data.email)) {
      errors.email = true;
    }

    return {
      isError: Object.keys(errors).length > 0,
      errors
    };
  };

  const handleSubmit = e => {
    console.log("form submitted");
    e.preventDefault();

    const validated = validateForm();
    console.log(validated);

    if (validated.isError) {
      setErrors(currentErrors => validated.errors);
    } else {
      setErrors({});
      console.log("show badge");
      setShowSnack(true);
      setData({
        name: "",
        email: ""
      });
    }
  };

  const closeSnack = () => {
    setShowSnack(false);
  };

  return (
    <div className="Login">
      <Card square style={{ maxWidth: "50vh" }}>
        <CardContent>
          <Grid container direction="column">
            <TextField
              error={errors.name}
              label="Name"
              type="text"
              name="name"
              helperText={errors.name && "Please enter Name"}
              onChange={handleChange}
              value={data.name}
            />
            <TextField
              error={errors.email}
              label="Email"
              type="email"
              name="email"
              helperText={errors.email && "Please enter valid email"}
              onChange={handleChange}
              value={data.email}
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <img src={frontpageImg} alt="" className="front-page-img" />
      <Snackbar
        open={showsnack}
        autoHideDuration={5000}
        message="Data submitted successfully"
        onClose={closeSnack}
        action={
          <IconButton aria-label="close" color="inherit" onClick={closeSnack}>
            <CloseIcon />
          </IconButton>
        }
      ></Snackbar>
    </div>
  );
}

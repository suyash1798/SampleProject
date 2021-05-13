import { Button, Card, Grid, InputLabel, TextField } from "@material-ui/core";
// import { createRef } from "react";
import "./signup.css";
import axios from "axios";
import { useState } from "react";
import { emailRegex } from "../../shared/utils";
import { navigate } from "@reach/router";

function Signup() {
  const [errors, setError] = useState({});
  const [data, setData] = useState({});

  const onSignup = async (event) => {
      event.preventDefault();
    let error = false;
    for (let key in errors) {
      console.log(errors[key])
      if (errors[key]) error = true;
    }
    console.log(error)
    if (!error) {
      await axios.post("auth/signup", data);
      navigate('/enter');  
    }
  };

  const validations = (input, value) => {
    setData((data) => {
      data[input] = value;
      return data;
    });
    if (input === "username") {
      if (value.length < 5) {
        setError((error) => ({ ...error, username: "Enter a valid username" }));
      } else {
        setError((error) => ({ ...error, username: null }));
      }
    }
    if (input === "email") {
      if (!emailRegex.test(value)) {
        setError((error) => ({ ...error, email: "Enter a valid Email" }));
      } else {
        setError((error) => ({ ...error, email: null }));
      }
    }
    if (input === "password") {
      if (value.length < 5) {
        setError((error) => ({ ...error, password: "Enter a valid Email" }));
      } else {
        setError((error) => ({ ...error, password: null }));
      }
    }
  };

  const onHandleChange = (event) => {
    validations(event.target.name, event.target.value);
  };

  return (
    <Card variant="outlined" className="signup-card">
      <Grid container direction="column">
        <form onSubmit={onSignup}>
          <Grid container direction="column" alignItems="stretch">
            <Grid
              container
              direction="column"
              alignItems="stretch"
              className="signup-fields"
            >
              <InputLabel>Username:</InputLabel>
              <TextField
                variant="outlined"
                name="username"
                {...(errors["username"] && {
                  helperText: errors["username"],
                  error: true,
                })}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="stretch"
              className="signup-fields"
            >
              <InputLabel>Email:</InputLabel>
              <TextField
                name="email"
                variant="outlined"
                {...(errors["email"] && {
                  helperText: errors["email"],
                  error: true,
                })}
                onChange={onHandleChange}
              />
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="stretch"
              className="signup-fields"
            >
              <InputLabel>Password:</InputLabel>
              <TextField
                id="outlined-basic"
                type="password"
                name="password"
                variant="outlined"
                {...(errors["password"] && {
                  helperText: errors["password"],
                  error: true,
                })}
                onChange={onHandleChange}
              />
            </Grid>
            <Button variant="contained" className="signup-fields" type="submit">
              Signup
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
}

export default Signup;

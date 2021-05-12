import { Button, Card, Grid, InputLabel, TextField } from "@material-ui/core";
// import { createRef } from "react";
import "./signup.css";
import axios from "axios";
import { useRef } from "react";

function Signup() {
  
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    
  const onSignup = async (event) => {
    //   event.preventDefault();
      console.log(emailRef,passwordRef,usernameRef);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const username = usernameRef.current.value;
      
      const data = {email,password,username};
      console.log(data);
      await axios.post('auth/signup',data)
        event.preventDefault();
  }
    
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
                inputRef={usernameRef}
              />
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="stretch"
              className="signup-fields"
            >
              <InputLabel>Email:</InputLabel>
              <TextField label="email" variant="outlined"  inputRef={emailRef}/>
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
                label="password"
                variant="outlined"
                inputRef={passwordRef}
              />
            </Grid>
            <Button variant="contained" className="signup-fields" type="submit">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
}

export default Signup;

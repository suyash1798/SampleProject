import { Button, Card, Grid, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import { useContext, useRef } from "react";
import { useHistory } from "react-router";
import { addLocalStorageToken } from "../../shared/auth";
import { AuthContext } from "../../store/auth";
import "./login.css";

function Login() {
  
    const emailRef = useRef();
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext)
    const history = useHistory();
    
    const onLogin = async (event)=>{
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        const data = {email:email, password:password};
        
        const res = await axios.post('auth/login',data)
        console.log(res)
        addLocalStorageToken(res.data.token);
        authCtx.setUserDetails(res.data.user);
        history.push('post-list')
    }
    
    return (
      <Card variant="outlined" className="login-card">
        <Grid container direction="column">
          <form onSubmit={onLogin}>
            <Grid container direction="column" alignItems="stretch">
              <Grid
                container
                direction="column"
                alignItems="stretch"
                className="login-fields"
              >
                <InputLabel>Email:</InputLabel>
                <TextField label="email" variant="outlined" inputRef={emailRef}/>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                className="login-fields"
              >
                <InputLabel>Password:</InputLabel>
                <TextField
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  type="password"
                  inputRef={passwordRef}
                />
              </Grid>
              <Button variant="contained" className="login-fields" type="submit">
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Card>
    );
}

export default Login;

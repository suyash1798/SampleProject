import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import "./auth.css";

function Auth(){
   
    const [page,setPage] = useState('login')
    
   const onRenderChange = (page)=>{
      setPage(page)
   }
   
//    onRenderChange('login')
   
  
    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        className="main-grid"
      >
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className="navbar-grid"
        >
          <Button color="primary" onClick={()=>onRenderChange('login')}>Log in</Button>
          <Button variant="contained" className="signup-button" onClick={()=>onRenderChange('signup')}>
            Signup
          </Button>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className="login-component"
        >
          { page === 'login' && <Login />}
          { page === 'signup' && <Signup />}
        </Grid>
      </Grid>
    );
}

export default Auth;

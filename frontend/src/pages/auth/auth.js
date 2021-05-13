import { Grid } from "@material-ui/core";
// import { Route } from "react-router-dom";
// import { useState } from "react";
import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import "./auth.css";
import qs from 'qs';
import { Redirect } from "@reach/router";
import { AuthContext } from "../../store/auth";
import { useContext } from "react";

function Auth(props) {
  
  const query = qs.parse(props.location.search.substring(1))
  const authCtx = useContext(AuthContext);
  let page = 'login'
  if(query.state === 'signup'){
    page = 'signup';
  }
  console.log(page)
  
  if(authCtx.user) {
    return <Redirect to='/post-list' noThrow />
  }
  
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className="login-component"
    >
        {page === 'login' && <Login />}
        {page === 'signup' && <Signup />}
    </Grid>
  );
}

export default Auth;

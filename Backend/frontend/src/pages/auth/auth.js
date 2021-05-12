import { Grid } from "@material-ui/core";
// import { Route } from "react-router-dom";
// import { useState } from "react";
import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import "./auth.css";
import qs from 'qs';

function Auth(props) {
  const query = qs.parse(props.location.search.substring(1))
  let page = 'login'
  if(query.state === 'signup'){
    page = 'signup';
  }
  console.log(page)
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

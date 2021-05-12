import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Auth from './pages/auth/auth';
import PostList from './pages/post-list/post-list';
import jwt_decode from "jwt-decode";
import { getLocalStorageToken } from "./shared/auth";
import { AuthContext } from "./store/auth";

function App() {
  axios.defaults.baseURL = "https://suyash-twinbit-assignment.herokuapp.com";
  
  // useLayoutEffect(()=>{
    
  //   console.log
  // },[authCtx])
  const [redirect,setRedirect] = useState('/enter')
  const [loggedIn,setLoggedIn] = useState(false)
  const authCtx = useContext(AuthContext)
  if(getLocalStorageToken() && !loggedIn){
    const {data} = jwt_decode(getLocalStorageToken())
    console.log(data);
    authCtx.setUserDetails(data);
    setRedirect('/post-list');
    setLoggedIn(true)
  }
  
  return (
      <Router>
        <Navbar />
        {/* {console.log(authCtx.current.user)} */}
        <Switch>
          <Redirect exact from="/" to={redirect} />
          <Route path="/enter" component={Auth} />
          <Route path="/post-list" component={PostList} />
        </Switch>
      </Router>
  );
}

export default App;

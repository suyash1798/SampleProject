import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import React, { useState } from "react";
import Auth from "./pages/auth/auth";
import PostList from "./pages/post-list/post-list";
import { getLocalStorageToken } from "./shared/utils";
import { AuthContextProvider } from "./store/auth";
import { Router } from "@reach/router";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const [redirect, setRedirect] = useState("/enter");
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(getLocalStorageToken());
  if (getLocalStorageToken() && !loggedIn) {
    setRedirect("/post-list");
    setLoggedIn(true);
  } else if (!getLocalStorageToken() && loggedIn) {
    setLoggedIn(false);
    setRedirect("/enter");
  }
  console.log(111, redirect);

  return (
    <AuthContextProvider>
      <Navbar />
      <Router className="router-component">
        <Auth path="/enter"/>
        <PostList path="/post-list"/>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

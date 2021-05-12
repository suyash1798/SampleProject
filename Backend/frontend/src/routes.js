import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// import history from 'browserHistory';
// import Project from 'Project';
// import Authenticate from 'Auth/Authenticate';
// import PageError from 'shared/components/PageError';
import Auth from './pages/auth/auth';
import PostList from './pages/post-list/post-list';

const Routes = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/enter" />
      <Route path="/enter" component={Auth} />
      <Route path="/post-list" component={PostList} />
    </Switch>
  </Router>
);

export default Routes;
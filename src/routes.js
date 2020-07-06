import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import VerifyToken from "./pages/VerifyToken";
import Dashboard from "./pages/Dashboard";
import DashboardDriver from "./pages/DashboardDriver";

export default function Routes() {
  const isAuthenticated = () => (
    localStorage.getItem('token') ? true : false
  )

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => (
       isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )} />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}/>
        <PrivateRoute path="/verify-token" component={VerifyToken} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/dashboardDriver" component={DashboardDriver} />
      </Switch>
    </BrowserRouter>
  );
}

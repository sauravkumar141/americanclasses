import React from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "../src/components/Main";

class ProtectedRoute extends React.Component {
  render() {
    return localStorage.getItem('checkAdmin') === 'successAdmin*#141' ? (
      <Route {...this.props} component={Main} />
    ) : (
      <Redirect to="/" />
    );
  }
}

export default ProtectedRoute;

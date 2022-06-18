import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Components from "./components/Components";
import ProtectedRoute from "./protectedRoute";
import Main from "../src/components/Main";

class App extends React.Component {

  render(){
    return (
          <div>
            <BrowserRouter>
              <MuiThemeProvider theme={theme}>
                <Switch>
                  <ProtectedRoute path="/login" component={Main} />
                  <Route>
                    <Components />
                  </Route>
                </Switch>
              </MuiThemeProvider>
            </BrowserRouter>
          </div>
        );
  }
}

export default App;



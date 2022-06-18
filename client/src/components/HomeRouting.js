import React from "react";
import { Switch } from "react-router-dom";
import Blog from "../components/blogs/Blog";
import Home from "./Home";
import PropsRoute from "../shared/components/PropsRoute";
import ShowNotification from '../components/seeNotification/ShowNotification';
import ShowResult from '../components/seeResult/ShowResult';
import TestSeriesHome from '../components/showTestSeries/TestSeriesHome';

class Routing extends React.Component {

constructor(props){
  super(props);
}

render(){
  return (
    <Switch>
      <PropsRoute
        exact
        path="/blog"
        component={Blog}
      />

      <PropsRoute
        exact
        path="/notification/:id"
        component={ShowNotification}
      />

      <PropsRoute
        exact
        path="/result/:id"
        component={ShowResult}
      />

      <PropsRoute
        path="/show"
        component={TestSeriesHome}
      />
      
      <PropsRoute path="/" component={Home}/>
    </Switch>
  );
}
}

export default Routing;

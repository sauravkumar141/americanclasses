import React, { useState, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";
import Posts from "./posts/Posts";
import PropsRoute from "../shared/components/PropsRoute";
import Notifications from "./addNotification/Notifications";
import Results from "./results/Results";
import TestSeries from "./testSeries/TestSeries";

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

function Routing(props) {
  const {
    classes,
    pushMessageToSnackbar,
    selectDashboard,
    selectPosts,
    selectNotifications,
    selectResults,
    selectTestSeries,
  } = props;

  const [thenthstudentsData, setTenthStudentsData] = useState([]);
  const [ninethstudentsData, setNinethStudentsData] = useState([]);

  const fetch10thStudentsData = useCallback(async () => {
    let res = await axios.get("/api/get10thStudentsData");
    setTenthStudentsData(res.data);
  }, [setTenthStudentsData]);

  const fetch9thStudentsData = useCallback(async () => {
    let res = await axios.get("/api/get9thStudentsData");
    setNinethStudentsData(res.data);
  }, [setNinethStudentsData]);

  useEffect(() => {
    fetch10thStudentsData();
    fetch9thStudentsData();
  }, [fetch10thStudentsData, fetch9thStudentsData]);

  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          path="/login/posts"
          component={Posts}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectPosts={selectPosts}
        />
        <PropsRoute
          path="/login/notifications"
          component={Notifications}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectNotifications={selectNotifications}
        />
        <PropsRoute
          path="/login/results"
          component={Results}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectResults={selectResults}
        />
        <PropsRoute
          path="/login/testseries"
          component={TestSeries}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectTestSeries={selectTestSeries}
        />

        <PropsRoute
          path=""
          component={Dashboard}
          selectDashboard={selectDashboard}
          thenthstudentsData={thenthstudentsData}
          ninethstudentsData={ninethstudentsData}
          fetch10thStudentsData={fetch10thStudentsData}
          fetch9thStudentsData={fetch9thStudentsData}
          pushMessageToSnackbar={pushMessageToSnackbar}
        />
      </Switch>
    </div>
  );
}

Routing.propTypes = {
  classes: PropTypes.object.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired,
  selectNotifications: PropTypes.func.isRequired,
  selectResults: PropTypes.func.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectTestSeries: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));

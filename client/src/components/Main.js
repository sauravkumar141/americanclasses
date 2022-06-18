import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import Routing from "./Routing";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../shared/components/ConsecutiveSnackbarMessages";
import smoothScrollTop from "../shared/functions/smoothScrollTop";

const styles = (theme) => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);

  const fetchRandomMessages = useCallback(async () => {
    let res = await axios.get("/api/getFeedback");
    setFeedback(res.data.reverse());
  }, [setFeedback]);

  const selectDashboard = useCallback(() => {
    smoothScrollTop();
    document.title = "Dashboard";
    setSelectedTab("Dashboard");
  }, [setSelectedTab]);

  const selectPosts = useCallback(() => {
    smoothScrollTop();
    document.title = "Posts";
    setSelectedTab("Posts");
  }, [setSelectedTab]);

  const selectNotifications = useCallback(() => {
    smoothScrollTop();
    document.title = "Notifications";
    setSelectedTab("Notifications");
  }, [setSelectedTab]);

  const selectResults = useCallback(() => {
    smoothScrollTop();
    document.title = "Results";
    setSelectedTab("Results");
  }, [setSelectedTab]);

  const selectTestSeries = useCallback(() => {
    smoothScrollTop();
    document.title = "Test Series";
    setSelectedTab("Test Series");
  }, [setSelectedTab]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );

  useEffect(() => {
    fetchRandomMessages();
  }, [fetchRandomMessages]);

  return (
    <Fragment>
      <NavBar
        selectedTab={selectedTab}
        messages={feedback}
        fetchRandomMessages={fetchRandomMessages}
      />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectPosts={selectPosts}
          selectNotifications={selectNotifications}
          selectResults={selectResults}
          selectDashboard={selectDashboard}
          selectTestSeries={selectTestSeries}
        />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));

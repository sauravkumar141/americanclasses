import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  withStyles,
  AppBar,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";
import ExposeNotification from "./ExposeNotification";

const styles = (theme) => ({
  tabContainer: {
    overflowY: "auto",
    maxHeight: 350,
  },
  divider: {
    marginTop: -2,
  },
  noShadow: {
    boxShadow: "none !important",
  },
});

var d = <b>You have not received any Notification yet...</b>;
var b = <b>You have not received any Results yet...</b>;

function MessagePopperButton(props) {
  const { classes, messages, header, name } = props;
  return (
    <Fragment>
      <AppBar position="static" color="secondary" className={classes.noShadow}>
        <Box pt={1} pl={2} pb={1} pr={1}>
          <Typography variant="subtitle1">{header}</Typography>
        </Box>
        <Divider className={classes.divider} />
      </AppBar>
      <List dense className={classes.tabContainer}>
        {messages.length === 0 ? (
          <ListItem>
            <ListItemText>
              {header === "Latest Messages..." ? d : b}
            </ListItemText>
          </ListItem>
        ) : (
          messages.map((element, index) => (
            <ExposeNotification
              key={index}
              message={element}
              name={name}
              divider={index !== messages.length - 1}
            />
          ))
        )}
      </List>
    </Fragment>
  );
}

MessagePopperButton.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(MessagePopperButton);

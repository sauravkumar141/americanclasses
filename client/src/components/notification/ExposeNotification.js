import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  withStyles,
} from "@material-ui/core";
import { Error } from "@material-ui/icons";

import { Link } from "react-router-dom";

const styles = {
  link: {
    textDecoration: "none",
  },
  btn: {
    transition: "0.3s",
    "&:hover": {
      background: "linear-gradient(180deg, navy, rgba(0, 0, 0, 0.04))",
      color: "white",
    },
  },
};

function MessageListItem(props) {
  const { message, divider, classes, name } = props;

  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);

  const handleError = useCallback(() => {
    setHasErrorOccurred(true);
  }, [setHasErrorOccurred]);

  return (
    <Link
      key={message._id}
      to={
        name === "notification"
          ? `/notification/${message._id}`
          : `/result/${message._id}`
      }
      className={classes.link}
    >
      <ListItem divider={divider} button className={classes.btn}>
        <ListItemAvatar style={{ marginTop: "20px" }}>
          {hasErrorOccurred ? (
            <Error color="secondary" />
          ) : (
            <Avatar
              src={message.active ? message.src : null}
              onError={handleError}
            />
          )}
        </ListItemAvatar>
        <ListItemText primary={message.text} secondary={message.date} />
      </ListItem>
    </Link>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object,
  divider: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(MessageListItem);

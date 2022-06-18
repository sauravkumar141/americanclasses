import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton
} from "@material-ui/core";
import axios from 'axios';
import ErrorIcon from "@material-ui/icons/Error";
import { withStyles } from '@material-ui/core/styles';
import {Delete} from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import img1 from '../../dummy_data/images/notification2.gif';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function MessageListItem(props) {
  const { message, divider, fetchRandomMessages } = props;
  const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
  const [open, setOpen] =useState(false);
  var firstString = message.message.split(" ", 6).toString().replace(/,/g, " ") + "....";

  const handleError = useCallback(() => {
    setHasErrorOccurred(true);
  }, [setHasErrorOccurred]);

  const handleClickOpen = useCallback(async(ids)=>{
    setOpen(true);
    await axios.post(`/api/editFeedback/${ids}`, {active: false});
    setTimeout(() => {
      fetchRandomMessages();
    },1000);
  },[setOpen, fetchRandomMessages]);

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = useCallback(async(ids) => {

     await axios.post(`/api/deleteFeedback/${ids}`);
    setTimeout(() => {
      fetchRandomMessages();
    },1000);
  },[fetchRandomMessages]);

  return (
    <div>
      <ListItem divider={divider} button onClick={()=>{handleClickOpen(message._id)}}>
      <ListItemAvatar>
        {hasErrorOccurred ? (
          <ErrorIcon color="secondary" />
        ) : (<Avatar src={message.active ? img1: null} onError={handleError}/>)}
      </ListItemAvatar>
      <ListItemText
        primary={firstString}
        secondary={`${message.date}  ${message.time}`}
      />
    </ListItem>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {`MOB: ${message.mobile} Email: ${message.email}`}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {message.message}
          </Typography>
        </DialogContent>
        <DialogActions>
        <IconButton color="primary" onClick={()=>{onDelete(message._id)}} aria-label="delete">
            <Delete />
         </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object,
  divider: PropTypes.bool,
  fetchRandomMessages: PropTypes.func.isRequired
};

export default MessageListItem;

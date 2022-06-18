import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import {makeStyles } from '@material-ui/core/styles';
import {
Table, 
Box,
Typography,
Toolbar,
Divider,
Button,
TableBody,
IconButton,
Avatar,
ListItemAvatar,
TableHead,
Paper,
TableContainer,
TableRow
} from '@material-ui/core';
import axios from 'axios';
import {Delete, Error, Edit} from "@material-ui/icons";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../shared/components/ConfirmationDialog";
import {styles, StyledTableCell, StyledTableRow} from '../../assets/jss/material-kit-react/components/tableStyle'

const useStyles = makeStyles(styles);

function NotificationsContent(props) {
     
    const classes = useStyles();
    const {pushMessageToSnackbar, messages, fetchRandomMessages, openAddNotificationModal, openEditNotificationtModal } = props;
    const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
    const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(false);
    const [ids, setIds] = useState(0);
    const [hasErrorOccurred, setHasErrorOccurred] = useState(false);

    const onDelete = useCallback((ids) => {
      setIds(ids);
      setIsDeletePostDialogOpen(true);
    }, [setIds, setIsDeletePostDialogOpen]);

    const closeDeletePostDialog = useCallback(() => {
      setIsDeletePostDialogOpen(false);
      setIsDeletePostDialogLoading(false);
    }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);

    const handleError = useCallback(() => {
      setHasErrorOccurred(true);
    }, [setHasErrorOccurred]);

    const deleteMessage = useCallback(async() => {
      setIsDeletePostDialogLoading(true);
      let res= await axios.post(`/api/deleteNotification/${ids}`);
      setTimeout(() => {
        res.data ? (
          pushMessageToSnackbar({
            text: "Your notification has  deleted.."
          })
        ) : (
          pushMessageToSnackbar({
            text: "Your notification has not  deleted.."
          })
        )
        fetchRandomMessages();
        closeDeletePostDialog();
      }, 1000);
    }, [ 
      ids,
      setIsDeletePostDialogLoading,
      pushMessageToSnackbar,
      fetchRandomMessages,
      closeDeletePostDialog,
    ]);

    const printMessageGrid = useCallback(() => {
      if (messages.length > 0) {
        return (
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell >Id</StyledTableCell>  
                <StyledTableCell >Icon</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((message, index) => {
                return(
                  <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {(index + 1)}
                  </StyledTableCell>
                  <StyledTableCell>
                  <ListItemAvatar style={{marginTop: "20px"}}>
                  {hasErrorOccurred ? (
                    <Error color="secondary" />
                  ) : (
                     <Avatar
                      src={message.active ? message.src : null }
                      onError={handleError}
                    />
                  )}
                </ListItemAvatar>
                  </StyledTableCell>
                  <StyledTableCell align="center">{message.date}</StyledTableCell>
                  <StyledTableCell align="center">{message.text}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary"  onClick={()=>{openEditNotificationtModal(message._id)}} aria-label="active">
                    <Edit />
                  </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary" onClick={()=>{onDelete(message._id)}} aria-label="delete">
                    <Delete />
                  </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        );
      }
       setTimeout(()=>(
        <Box m={2}>
        <HighlightedInformation>
          No posts added yet. Click on &quot;NEW&quot; to create your first one.
        </HighlightedInformation>
      </Box>
       ),1000)
    }, [messages, onDelete, hasErrorOccurred, handleError, classes, openEditNotificationtModal]);

    return(
       <>
        <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Your Message</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddNotificationModal}
          disableElevation>
          Add Message
        </Button>
      </Toolbar>
      <Divider />
       {printMessageGrid()}
      <ConfirmationDialog
        open={isDeletePostDialogOpen}
        title="Confirmation"
        content="Do you really want to delete the message?"
        onClose={closeDeletePostDialog}
        loading={isDeletePostDialogLoading}
        onConfirm={deleteMessage}
      />
       </>
  );
}

NotificationsContent.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    openAddNotificationModal: PropTypes.func.isRequired,
    openEditNotificationtModal: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchRandomMessages: PropTypes.func.isRequired,
  };

export default NotificationsContent;
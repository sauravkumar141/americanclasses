import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
TableCell,
TableHead,
Paper,
TableRow,
TableContainer
} from '@material-ui/core';
import axios from 'axios';
import {Delete, Edit, Error} from "@material-ui/icons";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../shared/components/ConfirmationDialog";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: "15px"
  },
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: "#c8fdfd",
    background: "linear-gradient(-14deg, black, rgb(31 234 18 / 33%))"
  }
});


function ResultContent(props) {

    const classes = useStyles();
    const {pushMessageToSnackbar, results, fetchRandomResults,openEditResultModal, openAddResultModal } = props; 
    const [isDeleteResultDialogOpen, setIsDeleteResultDialogOpen] = useState(false);
    const [isDeleteResultDialogLoading, setIsDeleteResultDialogLoading] = useState(false);
    const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
    const [count, setCount] = useState(0);

    const handleError = useCallback(() => {
      setHasErrorOccurred(true);
    }, [setHasErrorOccurred]);
    
    const onDelete = useCallback((ids) => {
      setCount(ids);
      setIsDeleteResultDialogOpen(true);
    }, [setCount, setIsDeleteResultDialogOpen]);

    const closeDeletePostDialog = useCallback(() => {
      setIsDeleteResultDialogOpen(false);
      setIsDeleteResultDialogLoading(false);
    }, [setIsDeleteResultDialogOpen, setIsDeleteResultDialogLoading]);

    const deleteResult = useCallback(async() => {
      setIsDeleteResultDialogLoading(true);
      let res= await axios.post(`/api/deleteResult/${count}`);
      setTimeout(() => {
        res.data ? (
          pushMessageToSnackbar({
            text: "Your result has been deleted.."
          })
        ) : (
          pushMessageToSnackbar({
            text: "Your result has not been deleted.."
          })
        )
        fetchRandomResults();
        closeDeletePostDialog();
      }, 1500);
    }, [ 
      fetchRandomResults,
      count,
      setIsDeleteResultDialogLoading,
      pushMessageToSnackbar,
      closeDeletePostDialog,
    ]);

    const printResultGrid = useCallback(() => {
      if (results.length > 0) {
        return (
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell >Id</StyledTableCell>  
                <StyledTableCell >Icon</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((message, index) => {
                  //  retn.push(message.id);
                return(
                  <StyledTableRow key={message._id}>
                  <StyledTableCell component="th" scope="row">
                    {(index + 1)}
                  </StyledTableCell>
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
                  <StyledTableCell align="center">{message.date}</StyledTableCell>
                  <StyledTableCell align="center">{message.text}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary"  onClick={()=>{openEditResultModal(message._id)}} aria-label="active">
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
              No results added yet. Click on &quot;NEW&quot; to create your first one.
            </HighlightedInformation>
          </Box>
      ),1000)
    }, [results, classes, onDelete, handleError, openEditResultModal, hasErrorOccurred]);

    return(
       <div>
        <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Your Results</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddResultModal}
          disableElevation>
          Add Result
        </Button>
      </Toolbar>
      <Divider />
       {printResultGrid()}
      <ConfirmationDialog
        open={isDeleteResultDialogOpen}
        title="Confirmation"
        content="Do you really want to delete this result ?"
        onClose={closeDeletePostDialog}
        loading={isDeleteResultDialogLoading}
        onConfirm={deleteResult}
      />
       </div>
  );
}

ResultContent.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    fetchRandomResults: PropTypes.func.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    openAddResultModal: PropTypes.func.isRequired,
    openEditResultModal: PropTypes.func.isRequired
  };

export default ResultContent;
/*
setState({ ...state, [event.target.name]: event.target.checked });
setState([{ ...state, [event.target.name]: event.target.checked }]);
*/
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
import {Delete, Edit} from "@material-ui/icons";
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


function TestSeriesContent(props) {

    const classes = useStyles();
    const {pushMessageToSnackbar, testSeries, fetchTestSeries,openEditTestSeriesModal, openAddTestSeriesModal } = props; 
    const [isDeleteResultDialogOpen, setIsDeleteResultDialogOpen] = useState(false);
    const [isDeleteResultDialogLoading, setIsDeleteResultDialogLoading] = useState(false);
    const [count, setCount] = useState(0);

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
      let res= await axios.post(`/api/deleteTestSeries/${count}`);
      setTimeout(() => {
        res.data ? (
          pushMessageToSnackbar({
            text: "Your testSeries has deleted.."
          })
        ) : (
          pushMessageToSnackbar({
            text: "Your testSeries has not deleted.."
          })
        )
        fetchTestSeries();
        closeDeletePostDialog();
      },2000);
    },[ 
      setIsDeleteResultDialogLoading,
      closeDeletePostDialog,
      count,
      fetchTestSeries,
      pushMessageToSnackbar
    ]);

    const printResultGrid = useCallback(() => {
      if (testSeries.length > 0) {
        return (
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell >S.No:</StyledTableCell>  
                <StyledTableCell >Active</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">TestSeries</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testSeries.map((message, index) => {
                return(
                  <StyledTableRow key={message._id}>
                  <StyledTableCell component="th" scope="row">
                    {(index + 1)}
                  </StyledTableCell>
                  <ListItemAvatar style={{marginTop: "20px"}}>
                     <Avatar
                      src={message.active ? message.src : null }
                    />
                </ListItemAvatar>
                  <StyledTableCell align="center">{message.date}</StyledTableCell>
                  <StyledTableCell align="center">{message.text}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary"  onClick={()=>{openEditTestSeriesModal(message._id)}} aria-label="active">
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
              No testSeries added yet. Click on &quot;NEW&quot; to create your first one.
            </HighlightedInformation>
          </Box>
          ),1000)
        
    }, [testSeries, classes, onDelete, openEditTestSeriesModal]);

    return(
       <div>
        <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Your TestSeries</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddTestSeriesModal}
          disableElevation>
          Add TestSeries
        </Button>
      </Toolbar>
      <Divider />
       {printResultGrid()}
       <ConfirmationDialog
        open={isDeleteResultDialogOpen}
        title="Confirmation"
        content="Do you really want to delete this testSeries ?"
        onClose={closeDeletePostDialog}
        loading={isDeleteResultDialogLoading}
        onConfirm={deleteResult}
      />
       </div>
  );
}

TestSeriesContent.propTypes = {
    pushMessageToSnackbar: PropTypes.func,
    fetchTestSeries: PropTypes.func.isRequired,
    testSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
    openAddTestSeriesModal: PropTypes.func.isRequired,
    openEditTestSeriesModal: PropTypes.func.isRequired
  };

export default TestSeriesContent;
/*
setState({ ...state, [event.target.name]: event.target.checked });
setState([{ ...state, [event.target.name]: event.target.checked }]);
*/
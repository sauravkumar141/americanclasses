import React, {useEffect, useState, useCallback } from "react";
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
TableCell,
TableHead,
Paper,
TableRow,
TableContainer
} from '@material-ui/core';
import axios from 'axios';
import {Delete} from "@material-ui/icons";
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

function Dashboard(props) {
  const {selectDashboard, thenthstudentsData, ninethstudentsData, fetch10thStudentsData, fetch9thStudentsData, pushMessageToSnackbar } = props;
  const classes = useStyles();

    const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
    const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(false);
    const [ids, setIds] = useState(0);
    const [students, setStudents] = useState([]);
    const [clas, setClas] = useState("");


    const onDelete = useCallback((ids) => {
      setIds(ids);
      setIsDeletePostDialogOpen(true);
    }, [setIds, setIsDeletePostDialogOpen]);

    
    const showNine = useCallback(() => {
      setStudents(ninethstudentsData);
      setClas("nine");
    },[setStudents, setClas, ninethstudentsData]);

    const showTen = useCallback(() => {
      setStudents(thenthstudentsData);
      setClas("ten");
    },[setStudents, setClas,thenthstudentsData]);

    const closeDeletePostDialog = useCallback(() => {
      setIsDeletePostDialogOpen(false);
      setIsDeletePostDialogLoading(false);
    }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);

    const deleteMessage = useCallback(async() => {
      setIsDeletePostDialogLoading(true);
      let res;
           clas === "ten" ? 
           (res=await axios.post(`/api/delete10ThStudent/${ids}`)) :
           (res=await axios.post(`/api/delete9ThStudent/${ids}`))
      
      setTimeout(() => {
        res.data ? (pushMessageToSnackbar({text: `Student ID  has deleted.`})) : 
        (pushMessageToSnackbar({text: `Student ID  has not deleted.`}))
 
        if(clas === "nine"){
          fetch9thStudentsData();
        }else{
          fetch10thStudentsData();
        }

        closeDeletePostDialog();
      },2000);
    }, [ 
      ids,
      clas,
      setIsDeletePostDialogLoading,
      pushMessageToSnackbar,
      fetch10thStudentsData,
      fetch9thStudentsData,
      closeDeletePostDialog,
    ]);

    useEffect(()=>{
      selectDashboard();
      setClas("ten");
      setStudents(thenthstudentsData);
    },[selectDashboard, setClas, thenthstudentsData, setStudents]);

    const printMessageGrid = useCallback(() => {
      if (students.length > 0) {
        return (
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">S.ID</StyledTableCell>  
                <StyledTableCell >Student's Name</StyledTableCell>
                <StyledTableCell align="center">Father's Name</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Mobile</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Class</StyledTableCell>
                <StyledTableCell align="center">Password</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => {
                return(
                  <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">{student.studentId}</StyledTableCell>
                  <StyledTableCell>{student.studentName}</StyledTableCell>
                  <StyledTableCell align="center">{student.fatherName}</StyledTableCell>
                  <StyledTableCell align="center">{student.address}</StyledTableCell>
                  <StyledTableCell align="center">{student.mobileNumber}</StyledTableCell>
                  <StyledTableCell align="center">{student.gender}</StyledTableCell>
                  <StyledTableCell align="center">{student.class}</StyledTableCell>
                  <StyledTableCell align="center">{student.password}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary" onClick={()=>{onDelete(student._id)}} aria-label="delete">
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
          Admin You have no Students in Database
        </HighlightedInformation>
      </Box>
       ),1000)
    }, [students, onDelete, classes]);

    return(
       <>
        <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Your Students</Typography>
        <Button
          variant="contained"
          color={clas === "ten" ? "secondary" :""}
          onClick={showTen}
          disableElevation>
         10th
        </Button>
         <Button
          variant="contained"
          color={clas === "nine" ? "secondary" :""}
          onClick={showNine}
          disableElevation>
         9th
        </Button>
      </Toolbar>
      <Divider />
       {printMessageGrid()}
      <ConfirmationDialog
        open={isDeletePostDialogOpen}
        title="Confirmation"
        content="Do you really want to delete this student ?"
        onClose={closeDeletePostDialog}
        loading={isDeletePostDialogLoading}
        onConfirm={deleteMessage}
      />
       </>
  );
}

Dashboard.propTypes = {
  selectDashboard: PropTypes.func.isRequired,
  thenthstudentsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  ninethstudentsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetch10thStudentsData: PropTypes.func.isRequired,
  fetch9thStudentsData: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,

};

export default Dashboard;

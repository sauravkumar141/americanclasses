import React, {useEffect, useState, useCallback} from 'react';
import Parallax from '../Parallax/Parallax';
import classNames from "classnames";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Grid
  } from '@material-ui/core';
import {useParams} from 'react-router-dom';
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Instagram, YouTube, Facebook} from '@material-ui/icons';
import styles from '../../assets/jss/material-kit-react/views/profilePage';
import {StyledTableCell, StyledTableRow} from '../../assets/jss/material-kit-react/components/tableStyle';

const useStyles = makeStyles(styles);

function ShowNotification(props) {

    const classes = useStyles();
    const {id} = useParams();

    const [studentDetails, setStudentDetails] = useState([]);
    const [studentID, setStudentID] = useState();
    const [showResult, setShowResult]= useState([]);
    const [results, setResults] = useState([]);
    const [visible, setVisible]=useState(false);


    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );

    const handleStudentID = useCallback(
      event => {
        const { target } = event;
        const { value } = target;
        setStudentID(value);
      },[setStudentID]);

  const searchStudent= useCallback(()=>{
    let visble;
    if(studentID !== undefined){
        studentDetails.map((student)=>{
          if(student.studentId === studentID){
             let index =showResult.findIndex((reslt) => reslt.name === student.studentName);
             setShowResult([showResult[index]]);
             visble=true;
          }
        return null;
        })
        
         if(visble){          
          }else{
          setVisible(true);
         }
        setStudentID("");
    }
   
  },[studentID, showResult, studentDetails, setVisible, setStudentID])

  const fetchStudentsData= useCallback(async()=>{

    let index = results.findIndex((element) => element._id === id);
    const getIndex = results[index];
    let res;
    getIndex.clas === "10" ? (res=await axios.get('/api/get10thStudentsData')): (res=await axios.get('/api/get9thStudentsData'));
    setStudentDetails(res.data);
    setShowResult(getIndex.results);
  },[results, id, setStudentDetails, setShowResult]);

  const fetchResults = useCallback(async()=>{
    let res= await axios.get('/api/getResult');
    setResults(res.data.reverse());
  },[setResults])

   useEffect(()=>{
    fetchResults();
     fetchStudentsData();
   },[fetchResults, fetchStudentsData]);

    return(
        <div>
          <Parallax small filter image={require("../../assets/img/ty.jpg")} />
           <div className={classNames(classes.main, classes.mainRaised)}>
               <div className={classes.container}>
               <GridContainer justify="center">
               <GridItem>
                <div className={classes.profile}>
                  <div>
                    <img src={require('../../assets/img/faces/dr.jpg')} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Amit Sir</h3>
                    <h5>Founder of Nirman Classes</h5>
                    <Button  
                    href="https://www.youtube.com/c/BiharBoardGuruji" 
                    target="_blank" 
                    justIcon
                    className={classes.margin5}>
                       <YouTube />
                    </Button>
                    <Button 
                    href="https://www.instagram.com/kr_amit96/" 
                    target="_blank" 
                    justIcon 
                    className={classes.margin5}>
                       <Instagram />
                    </Button>
                    <Button 
                    href="https://m.facebook.com/profile.php?id=100007653226903&ref=content_filter" 
                    target="_blank" 
                    justIcon 
                    className={classes.margin5}>
                       <Facebook />
                    </Button>
                  </div>
                </div>
               </GridItem>
               </GridContainer>
               </div>  
           </div>  
               {results.map((result, index)=> {
                return(
                 result._id === id ? (
                   <>
                  <Card key={index} className={classes.root}>
                  <CardContent>
                   <Grid spacing={0} container>
                      <Grid item xs={12} sm={6} md={8} lg={8} >
                        <h1><b>{result.text}</b></h1>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4} lg={4} >
                        <TextField placeholder="Enter Student ID" value={studentID} onInput={handleStudentID} className={classes.searchText}/> 
                        <Button variant="contained" className={classes.searchButton} onClick={searchStudent}>Search Result</Button>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} >
                        {visible && <h2 className={classes.visibility}>Invalid Student ID</h2>}
                      </Grid>
                   </Grid>
                   </CardContent>
                   </Card>
                   <TableContainer component={Paper} style={{marginTop: "10px"}} >
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Rank</StyledTableCell>  
                            <StyledTableCell>Name</StyledTableCell>  
                            <StyledTableCell>Marks</StyledTableCell>
                            <StyledTableCell>Total Marks</StyledTableCell> 
                            <StyledTableCell>Percentage(%)</StyledTableCell>   
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                          showResult.map((resultGet, index) => {
                            return(
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                  {resultGet.rank}
                                </StyledTableCell>
                                  <StyledTableCell>{resultGet.name}</StyledTableCell>
                                  <StyledTableCell>{resultGet.marks}</StyledTableCell>
                                  <StyledTableCell>{result.total}</StyledTableCell>
                                  <StyledTableCell>{`${(resultGet.marks*100/result.total).toFixed(2)} %`}</StyledTableCell>
                               </StyledTableRow>
                            )})
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </>
                  ) : (null)
                )
               })}
        </div>
    )
}

export default ShowNotification;

/*

                 {results.map(result=> {
                return(
                 result._id === id ? (
                  <Card className={classes.root}>
                  <CardContent>
                   <Grid spacing={0} container>
                         <Grid item xs={12} sm={6} md={8} lg={8} >
                          <h1><b>{result.text}</b></h1>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4} >
                            <TextField label="Enter Student ID" value={studentID} onInput={handleStudentID} className={classes.searchText}/> 
                            <Button variant="contained" className={classes.searchButton} onClick={searchStudent}>Search Result</Button>
                          </Grid>
                   
                   <TableContainer component={Paper} style={{marginTop: "10px"}} >
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Rank</StyledTableCell>  
                            <StyledTableCell>Name</StyledTableCell>  
                            <StyledTableCell>Marks</StyledTableCell>
                            <StyledTableCell>Total Marks</StyledTableCell>   
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            result.results.map((resultGet, index) => {
                            return(
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                  {(index + 1)}
                                </StyledTableCell>
                                  <StyledTableCell>{resultGet.name}</StyledTableCell>
                                  <StyledTableCell>{resultGet.marks}</StyledTableCell>
                                  <StyledTableCell>{result.total}</StyledTableCell>
                               </StyledTableRow>
                            )})
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                   </Grid>
                   </CardContent>
                   </Card>
                  ) : (null)
                )
               })}
*/
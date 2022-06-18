import React, { Fragment, useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Grid, TextField, Box, Paper, DialogContent, Typography, withStyles} from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import {Table,TableBody,IconButton,TableHead,TableContainer,TableRow,Radio} from '@material-ui/core';
import {Delete} from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";
import {StyledTableCell, StyledTableRow} from '../../assets/jss/material-kit-react/components/tableStyle'

const maxWidth="md";

const styles = theme => ({
  helpPadding: {
    "@media (max-width:  400px)": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  img: {
    width: "40%",
    height: "50px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: "60px"
  },
  fullWidth: {
    width: "95%"
  },
  relative: {
    position: "relative"
  },
  fileInput: {
    marginTop: "20px"
  },
  addBtn: {
    marginTop: "30px",
    marginLeft: "80px"
  }
});

function EditResult(props) {
  const {
    pushMessageToSnackbar,
    onClose,
    results,
    editId,
    theme,
    helpPadding,
    classes,
    fetchRandomResults
  } = props;
  
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [desp, setDesp] = useState("");
  const [choosedDate, setChooseDate] = useState("");
  const [state, setState] = useState(null);
  const [resultsData, setResultsData] = useState([]);
  const [total, setTotal] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const nameRef = useRef();
  var studentdata=[...resultsData];

  useEffect(()=>{
    let index =results.findIndex((element) => element._id === editId);
     const result = results[index];
       setSelectedFile(result.src);
       setResultsData(result.results);
       setChooseDate(result.date);
       setState(result.active);
       setDesp(result.text);
       setTotal(result.total);
       setSelectedValue(result.clas)
   },[results, editId, setSelectedFile, setSelectedValue, setTotal, setResultsData, setChooseDate, setDesp, setState]);
 
   const handleRadioClass = (event) => {
    setSelectedValue(event.target.value);
  };


  const handleChange = useCallback((event) => {
    setState(event.target.checked);
  },[setState]);

  const handleUpload = useCallback(async() => {
    setLoading(true);
    resultsData.sort((obj1, obj2) => obj2.marks - obj1.marks);
    var rank = 1;
    let arr= resultsData.map((obj1, index)=> {
      if (index > 0 && resultsData[index].marks !== resultsData[index - 1].marks){
        rank++;
      }
      return {...obj1, rank: rank}
    })

    console.log('oooooooooooooooooooo ', arr);

    
    const data = {
      src: selectedFile,
      date: choosedDate,
      text: desp,
      results: arr,
      active: state,
      total: total,
      clas: selectedValue
    };
    let res= await axios.post(`/api/editResult/${editId}`, data);
    setTimeout(() => {
      res.data ? (
        pushMessageToSnackbar({
          text: "Your result has been updated.."
        })
      ) : (
        pushMessageToSnackbar({
          text: "Your result has not been updated.."
        })
      )
      fetchRandomResults();
      onClose();
    }, 2000);
  }, [setLoading, choosedDate, selectedFile, total, selectedValue, editId, resultsData, fetchRandomResults, desp, state, onClose, pushMessageToSnackbar]);

  const addResult= useCallback(()=>{
   
    if(name && (parseInt(marks) <= parseInt(total))){
      setResultsData([...resultsData, {name, marks}]);
    }
     setName("");
     setMarks("");
     nameRef.current.focus();
 },[setResultsData, setName, setMarks, nameRef, name, resultsData, marks, total]);

const openDeleteResult= useCallback(id =>{

  const _results = [...resultsData];
  const index = _results.findIndex((element, index) => index === (resultsData.length - (id+1)));
  _results.splice(index, 1);
  setResultsData(_results);
},[resultsData, setResultsData]);

const onImageChange  = useCallback(event => {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    };
    reader.readAsDataURL(file);
  }
}, [setSelectedFile]);

const handleName = useCallback(
  event => {
    const { target } = event;
    const { value } = target;
    setName(value);
  },[setName]);

  const handleMarks = useCallback(
    event => {
      const { target } = event;
      const { value } = target;
      setMarks(value);
    },[setMarks]);

  const handleTextDescription = useCallback(
    event => {
      const { target } = event;
      const { value } = target;
      setDesp(value);
    },[setDesp]);

    const handleTotal = useCallback(
      event => {
        const { target } = event;
        const { value } = target;
        setTotal(value);
      },[setTotal]);  

    const handleDate = useCallback(
      event => {
        const { target } = event;
        const { value } = target;
        setChooseDate(value);
      },[setChooseDate]);


        return (
          <Fragment>
            <Box pt={1}>
             <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth], backgroundColor: "#bcbbd4" }}>
                 <DialogContent classes={helpPadding ? { root: classes.helpPadding } : null}>
                 <Typography paragraph variant="h5" style={{color: "rebeccapurple"}}>Update Result</Typography>
                 <Box mb={2}>
             <Grid spacing={0} container>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                 <TextField
                  variant="outlined"
                  label="Name" 
                  onInput={handleName}
                  value={name}
                  inputRef={nameRef}
                  autoFocus
                  className={classes.fileInput}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                 <TextField
                  variant="outlined"
                  label="Marks" 
                  onInput={handleMarks}
                  value={marks}
                  className={classes.fileInput}
                  onKeyDown={event =>{
                    if(event.keyCode === 13){addResult()}
                   }}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                 <TextField
                  variant="outlined"
                  label="Total Marks" 
                  onInput={handleTotal}
                  value={total}
                  className={classes.fileInput}
                  onKeyDown={event =>{
                    if(event.keyCode === 13){addResult()}
                   }}
                />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                <Button
                    className={classes.addBtn}
                    onClick={addResult}
                    variant="contained"
                    color="secondary"
                    disabled={loading}>
                    Add {loading && <ButtonCircularProgress />}
                  </Button>
             </Grid>
            </Grid>
          
           <Grid spacing={0} container>
              <Grid item xs={6} md={4} sm={4} lg={3} className={classes.fileInput}>
                   <input
                      accept="image/*"
                      onChange={onImageChange}
                      multiple
                      name="image"
                      type="file"
                    /> 
              </Grid>
              <Grid item xs={6} md={4} sm={4} lg={3} className={classes.fileInput}>
                <img
                  alt="uploaded item"
                  src={selectedFile}
                  className={classes.img}
                />
              </Grid>

              <Grid item xs={6} md={4} sm={4} lg={3} className={classes.fileInput}>
                <FormGroup>
                    <FormControlLabel
                    control={<Switch checked={state} onChange={handleChange} />}
                    label="Active"
                  />
                </FormGroup>
         </Grid>
         <Grid item xs={6} sm={4} md={4} lg={3} className={classes.fileInput}>
               <div>
                <b>Class 10</b>
               <Radio
                    checked={selectedValue === '10'}
                    onChange={handleRadioClass}
                    value="10"
                  />
               <b>Class 9</b>
                 <Radio
                    checked={selectedValue === '9'}
                    onChange={handleRadioClass}
                    value="9"
                  />
               </div>
              </Grid>
              </Grid>
              <Grid spacing={0} container>
                <Grid item xs={12} sm={6} lg={6} className={classes.fileInput}>
                    <TextField
                      label="Enter Date And Time" 
                      variant="outlined"
                      value={choosedDate}
                      onInput={handleDate}
                      className={classes.fullWidth}
                    />
                </Grid>
         
               <Grid item xs={12} sm={6} lg={6} className={classes.fileInput}>
                  <TextField
                      variant="outlined"
                      label="Description" 
                      onInput={handleTextDescription}
                      value={desp}
                      className={classes.fullWidth}
                    />
               </Grid>
              </Grid>

              <Grid spacing={0} container className={classes.fileInput}>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell >S NO:</StyledTableCell>  
                <StyledTableCell >Name</StyledTableCell>  
                <StyledTableCell >Marks</StyledTableCell>  
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentdata.reverse().map((result, index) => {
                return(
                  <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {(index + 1)}
                  </StyledTableCell>
                  <StyledTableCell>{result.name}</StyledTableCell>
                  <StyledTableCell>{result.marks}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton color="primary" onClick={()=>{openDeleteResult(index)}} aria-label="delete">
                    <Delete />
                  </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

              </Grid>
               
              <Grid spacing={0} container className={classes.fileInput}>
              <Grid>
                   <Button onClick={onClose} variant="contained" disabled={loading}>
                      Back
                    </Button>
             </Grid>
             <Grid style={{marginLeft: "5px"}}>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    color="secondary"
                    disabled={loading}>
                    Upload {loading && <ButtonCircularProgress />}
                  </Button>
             </Grid>
              </Grid>
              </Box>
              </DialogContent>
            </Paper>
          </Box>
          </Fragment>
        );
}

EditResult.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  helpPadding: PropTypes.bool,
  editId: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRandomResults: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(EditResult);

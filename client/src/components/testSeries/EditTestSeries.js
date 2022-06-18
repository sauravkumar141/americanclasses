import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Grid, TextField, Box, Paper, DialogContent, DialogTitle, Typography, withStyles} from "@material-ui/core";
import {FormGroup, IconButton } from '@material-ui/core';
import {FormControlLabel, FormControl, MenuItem, InputLabel, Select} from '@material-ui/core';
import {Delete, Edit} from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import Switch from '@material-ui/core/Switch';
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    marginLeft: "60px",
    marginTop: "10px"
  },
  relative: {
    position: "relative"
  },
  fileInput: {
    marginTop: "10px",
    marginRight: "5px"
    
  },
  addBtn: {
    marginTop: "30px",
    marginLeft: "80px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
});

function EditTestSeries(props) {
  const {
    pushMessageToSnackbar,
    onClose,
    fetchTestSeries,
    theme,
    editId,
    testSeries,
    helpPadding,
    classes
  } = props;

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [question, setQuestion] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [desp, setDesp] = useState("");
  const [choosedDate, setChooseDate] = useState("");
  const [state, setState] = useState(null);
  const nameRef = useRef();
  const [open, setOpen] =useState(false);
  const [testSeriesArray, setTestSeriesArray] = useState([]);
  const [id, setId] = useState();
  const [selectedID, setSelectedID] = useState();
  const [subject, setSubject] =useState("");
  const [mode, setMode] = useState("save");

  var testSeriesData=[...testSeriesArray];
  
  useEffect(()=>{
    let index =testSeries.findIndex((element) => element._id === editId);
     const result = testSeries[index];
       setSelectedFile(result.src);
       setTestSeriesArray(result.testSeries);
       setChooseDate(result.date);
       setState(result.active);
       setDesp(result.text);
       setSubject(result.subject);
       setId(result.testSeries.length + 1);
   },[testSeries, editId, setSelectedFile, setSubject, setId, setTestSeriesArray, setChooseDate, setDesp, setState]);
 
   const handleSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleClickOpen = useCallback((ids) => {
    setOpen(true);
    let index =testSeriesData.findIndex((element) => element.id === ids);
    setSelectedID(index);
  },[setSelectedID, setOpen,testSeriesData]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[setOpen]);

  const openDeleteQuestion= useCallback(() =>{
    const _testSeriesArray= [...testSeriesArray];
    const index = _testSeriesArray.findIndex((element, index) => index === (testSeriesArray.length - (selectedID+1)));
          _testSeriesArray.splice(index, 1);
          setTestSeriesArray(_testSeriesArray);
          handleClose();
  },[testSeriesArray, selectedID, setTestSeriesArray, handleClose]);

  const openEditQuestion= useCallback(() =>{
    setQuestion(testSeriesData[selectedID].question);
    setA(testSeriesData[selectedID].optionA);
    setB(testSeriesData[selectedID].optionB);
    setC(testSeriesData[selectedID].optionC);
    setD(testSeriesData[selectedID].optionD);
    setCorrectAnswer(testSeriesData[selectedID].correctAnswer);
    setMode("edit");
    handleClose();
},[handleClose, testSeriesData, selectedID, setQuestion, setA, setB, setC, setD, setCorrectAnswer, setMode]);

  const handleChange = useCallback((event) => {
    setState(event.target.checked);
  },[setState]);

  const handleUpload = useCallback(async() => {
    setLoading(true);
    const data = {
      src: selectedFile,
      date: choosedDate,
      text: desp,
      active: state,
      testSeries: testSeriesArray,
      subject: subject
    };
    let res= await axios.post(`/api/editTestSeries/${editId}`, data);
  
    setTimeout(() => {
      res.data ? (
        pushMessageToSnackbar({text: "Your testSeries has Updated.."})
      ) : (
        pushMessageToSnackbar({text: "Your testSeries has not Updated.."})
      )
      fetchTestSeries();
      onClose();
    }, 3000);
  }, [setLoading, fetchTestSeries, editId, pushMessageToSnackbar, subject, onClose, testSeriesArray, selectedFile,
     desp, state, choosedDate]);
  
  const addTestSeries= useCallback(()=>{
    if(question && a && b && c && d && correctAnswer){
        const obj ={
            question: question,
            optionA: a,
            optionB: b,
            optionC: c,
            optionD: d,
            correctAnswer: correctAnswer,
            id: id
          }
          if(mode === "edit"){
            testSeriesArray[testSeriesArray.length - (selectedID+1)]=obj;
           }else{
            setTestSeriesArray([...testSeriesArray, obj]);
          }
        setId(id +1)
      }
      setQuestion('');
      setA('');
      setB('');
      setC('');
      setD('');
      setCorrectAnswer('');
      setMode("save");
      nameRef.current.focus();
  },[nameRef, question, a, b, c, d, id, correctAnswer, testSeriesArray, mode,selectedID, setId,
     setTestSeriesArray, setQuestion, setA, setB, setC, setD, setCorrectAnswer, setMode]);

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

  const handleQuestion = useCallback(
    event => {
      const { target } = event;
      const { value } = target;
      setQuestion(value);
    },[setQuestion]);

    const handleCorrectAnswer = useCallback(
        event => {
          const { target } = event;
          const { value } = target;
          setCorrectAnswer(value);
        },[setCorrectAnswer]);

    const handleA = useCallback(
      event => {
        const { target } = event;
        const { value } = target;
        setA(value);
      },[setA]);

      const handleB = useCallback(
        event => {
          const { target } = event;
          const { value } = target;
          setB(value);
        },[setB]);


        const handleC = useCallback(
            event => {
              const { target } = event;
              const { value } = target;
              setC(value);
            },[setC]);

            const handleD = useCallback(
                event => {
                  const { target } = event;
                  const { value } = target;
                  setD(value);
                },[setD]); 

    const handleTextDescription = useCallback(
      event => {
        const { target } = event;
        const { value } = target;
        setDesp(value);
      },[setDesp]);

      const handleDate = useCallback(
        event => {
          const { target } = event;
          const { value } = target;
          setChooseDate(value);
        },[setChooseDate]);

        const showOption = useCallback(()=>{
          return(
             <Dialog
             open={open}
             TransitionComponent={Transition}
             keepMounted
             onClose={handleClose}
           >
             <DialogTitle>{`(A) ${testSeriesData[selectedID].optionA} (B) ${testSeriesData[selectedID].optionB} (C) ${testSeriesData[selectedID].optionC} (D) ${testSeriesData[selectedID].optionD}`}</DialogTitle>
             <DialogActions>
             <IconButton color="primary" onClick={()=>{openEditQuestion()}} aria-label="edit">
               <Edit />
             </IconButton>
             <IconButton color="primary" onClick={()=>{openDeleteQuestion()}} aria-label="delete">
               <Delete />
             </IconButton>
             <IconButton>
               <CloseIcon onClick={handleClose} />
             </IconButton>
             </DialogActions>
           </Dialog>
          )
       },[handleClose, openEditQuestion, openDeleteQuestion, testSeriesData, open, selectedID])

        return (
          <Fragment>
            <Box pt={1}>
             <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth], backgroundColor: "#bcbbd4" }}>
                 <DialogContent classes={helpPadding ? { root: classes.helpPadding } : null}>
                 <Typography paragraph variant="h5" style={{color: "rebeccapurple"}}>Update TestSeries</Typography>
                 <Box mb={2}>
            
                 <TextField
                  variant="outlined"
                  label="Question" 
                  fullWidth
                  onInput={handleQuestion}
                  value={question}
                  inputRef={nameRef}
                  autoFocus
                />
           
             <Grid spacing={0} container>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                 <TextField
                  variant="outlined"
                  label="Option A" 
                  
                  onInput={handleA}
                  value={a}
                  className={classes.fileInput}
                />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                 <TextField
                  variant="outlined"
                  label="Option B" 
                  
                  onInput={handleB}
                  value={b}
                  className={classes.fileInput}
                />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                 <TextField
                  variant="outlined"
                  label="Option C"
                  
                  onInput={handleC}
                  value={c}
                  className={classes.fileInput}
                />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                 <TextField
                  variant="outlined"
                  label="Option D" 
                  
                  onInput={handleD}
                  value={d}
                  className={classes.fileInput}
                />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={3}>
                 <TextField
                  variant="outlined"
                  label="Answer"
                  onInput={handleCorrectAnswer}
                  value={correctAnswer}
                  className={classes.fileInput}
                  onKeyDown={event =>{
                    if(event.keyCode === 13){addTestSeries()}
                   }}
                />
                </Grid>

                <Grid item xs={6} sm={6} md={4} lg={3} >
                <Button
                    className={classes.addBtn}
                    onClick={addTestSeries}
                    variant="contained"
                    color="secondary"
                    disabled={loading}>
                    Add {loading && <ButtonCircularProgress />}
                  </Button>
             </Grid>
            </Grid>

            <Grid>
              <h4>{`Total Questions: ${testSeriesData.length}`}</h4>
            </Grid>

            <Grid spacing={0} container>
              {testSeriesData.reverse().map((data, index)=>{
                  return(
               <div key ={index}>
                <Button variant="outlined" color="secondary" onClick={()=>{handleClickOpen(data.id)}} className={classes.fileInput}>
                  {data.question}
                </Button>
                {open && showOption()}
               </div>
                  )})}
            </Grid>

           <Grid spacing={0} container>
              <Grid item xs={6} sm={6} md={3} lg={3} >
                   <input
                      accept="image/*"
                      onChange={onImageChange}
                      multiple
                      name="image"
                      type="file"
                      className={classes.fileInput}
                    /> 
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} >
                <img
                  alt="uploaded item"
                  src={selectedFile}
                  className={classes.img}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={3} lg={3} >
                <FormGroup>
                    <FormControlLabel
                     control={<Switch checked={state} onChange={handleChange} />}
                     label="Active"
                    />
                </FormGroup>
              </Grid>
              <Grid em xs={6} sm={6} md={3} lg={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={subject}
                      onChange={handleSubject}
                      label="Subject"
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="Physics">Physics</MenuItem>
                      <MenuItem value="Chemistry">Chemistry</MenuItem>
                      <MenuItem value="Biology">Biology</MenuItem>
                      <MenuItem value="Geography">Geography</MenuItem>
                      <MenuItem value="History">History</MenuItem>
                      <MenuItem value="Civics">Civics</MenuItem>
                      <MenuItem value="Math">Math</MenuItem>
                      <MenuItem value="Sanskrit">Sanskrit</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
              </Grid>

              <Grid spacing={0} container>
                <Grid item xs={12} sm={4} md={6} lg={6} >
                    <TextField
                      label="Enter Date And Time" 
                      variant="outlined"
                      value={choosedDate}
                      onInput={handleDate}
                      className={classes.fileInput}
                      fullWidth
                    />
                </Grid>
         
               <Grid item xs={12} sm={8} md={6} lg={6}>
                  <TextField
                      variant="outlined"
                      label="Description" 
                      onInput={handleTextDescription}
                      value={desp}
                      className={classes.fileInput}
                      fullWidth
                    />
               </Grid>
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
                    Update {loading && <ButtonCircularProgress />}
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

EditTestSeries.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  helpPadding: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  testSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTestSeries: PropTypes.func.isRequired,
  editId: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(EditTestSeries);


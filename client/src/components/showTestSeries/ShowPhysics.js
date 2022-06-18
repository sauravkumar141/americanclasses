import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    ListItemText,
    AppBar,
    Box,
    Divider,
    ListItemAvatar,
    Avatar,
    Button,
    IconButton,
    FormControlLabel,
    Radio
  } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import img1 from '../../assets/img/cvcv.gif';
import img2 from '../../assets/img/hj.gif';


  const styles = theme => ({
    tabContainer: {
        overflowY: "auto",
        maxHeight: 350,
        backgroundColor: "lightblue",
        marginTop: "10px"
      },
      divider: {
        marginTop: -2,
      },
      noShadow: {
        boxShadow: "none !important",
        borderRadius: "5px"
      },
      link: {
        margin: "10px",
      },
      btn: {
        transition: "0.3s",
        "&:hover": {
          background: "linear-gradient(180deg, navy, rgba(0, 0, 0, 0.04))",
          color: "white"
        }
      },
      radioLabelColor: {
        color: "indigo"
      },
      tQues: {
        color: "#0be80b",
        textAlign: "center"
      },
      green: {
        color: '#fff',
        backgroundColor: "#26d026",
        borderRadius: "50%",
        marginBottom: "-10px"
      },
      red: {
        color: '#fff',
        backgroundColor: "red",
        borderRadius: "50%",
        marginBottom: "-10px"
      },
      showResult: {
        backgroundColor: "midnightblue",
        margin: "2%",
        borderRadius: "10px",
        color: "white",
        textAlign: "center"

      },
      question: {
       marginLeft: "15px",
       color: "red"
      },
      bk: {
        backgroundColor: "#cad7e2",
        borderRadius: "10px",
        margin: "5px"
      },
      img1: {
        width: "150px",
        height: "140px",
        marginTop: "-125px",
        marginLeft: "-15px"
      }
  });
  
  var takeAnswer =[];
  var correctAns = 0;

function ShowPhysic(props){

    const { classes, testSeries, headerMessage, errorMessage} = props;
    const [open, setOpen] =useState(false);
    const [id, setID] =useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState();
    const [showCorrect, setShowCorrect] = useState(false);

    const handleClickOpen = useCallback((ids) => {
      takeAnswer=[];
      setShowCorrect(false);
      setID(testSeries[ids].testSeries);
      setActiveStep(0);
      setOpen(true);
    },[setOpen, testSeries, setShowCorrect, setActiveStep, setID]);

    const haldleOption = useCallback((event, id) =>{
      setSelectedOption(event.target.value);
      let ds=event.target.value;
      takeAnswer[id]=ds;
  },[setSelectedOption]);

    const handleClose =useCallback(() => {
      setOpen(false);
    },[])

    const handleNext = useCallback(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },[])
  
    const handleBack = useCallback(() => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    },[])
  
    const handleReset = useCallback(() => {
      takeAnswer=[];
      setShowCorrect(false);
      setActiveStep(0);
      setOpen(true);
    },[setOpen, setShowCorrect, setActiveStep]);

    const showResult = useCallback(()=>{
      correctAns=0;
       id.map((qtion, index)=>{
            if(qtion.correctAnswer === takeAnswer[index]){
              correctAns++;
            }
            return null;
          })
           setTimeout(()=>{
            setShowCorrect(true);
            setActiveStep(0);
           },3000);
    },[id, setShowCorrect, setActiveStep])

    const isCheckedOptionA = useCallback((ids)=>{
     return takeAnswer[ids] === id[ids].optionA 
    },[id])
    const isCheckedOptionB = useCallback((ids)=>{

      return takeAnswer[ids] === id[ids].optionB 
     },[id])
     const isCheckedOptionC = useCallback((ids)=>{
      return takeAnswer[ids] === id[ids].optionC 
     },[id])
     const isCheckedOptionD = useCallback((ids)=>{
      return takeAnswer[ids] === id[ids].optionD 
     },[id])
    
    const showQuestion = useCallback(()=>{
      return (
        <div key={id.length}>
          <Dialog
            open={open}
            onClose={handleClose}
          >
             <div className={classes.tQues}><h3>{`Total Question No. = ${id.length}`}</h3></div>
             {showCorrect && (
               <>
               <div className={classes.showResult}>
                   <h4>{`Total Correct Answer = ${correctAns}`}</h4>
                   <h4>{`Check Your Results...`}</h4> 
               </div>
               <img src={img1} className={classes.img1} alt="img1" />
               </>
             )}
                {activeStep === id.length ? (
                  <>
                  <img src={img2} height="350px" alt="img2"/>
                  {showResult()}
                  </>
                ) : (
                  <div className={classes.bk}>
                  <div className={classes.question}><h5>{`Q${activeStep + 1}. ${id[activeStep].question}`}</h5></div>
                  <DialogContent>
                   <FormControlLabel
                        control={<Radio
                        checked={isCheckedOptionA(activeStep)}
                        onChange={(event)=>{haldleOption(event, activeStep)}}
                        value={id[activeStep].optionA} />}
                        label={`${id[activeStep].optionA}`}
                        className={classes.radioLabelColor}
                    />
                      {showCorrect && id[activeStep].optionA === id[activeStep].correctAnswer ? (
                        <CheckRoundedIcon  className={classes.green} />
                      ):(null)}
                      {showCorrect && (isCheckedOptionA(activeStep) && takeAnswer[activeStep] !== id[activeStep].correctAnswer) ? 
                      (<CloseRoundedIcon className={classes.red} />):(null)}
                    <br/>
                    <FormControlLabel
                        control={<Radio
                        checked={isCheckedOptionB(activeStep)}
                        onChange={(event)=>{haldleOption(event, activeStep)}}
                        value={id[activeStep].optionB} />}
                        label={`${id[activeStep].optionB}`}
                        className={classes.radioLabelColor}
                    />
                     {showCorrect && id[activeStep].optionB === id[activeStep].correctAnswer ? (
                        <CheckRoundedIcon  className={classes.green} />
                      ):(null)}
                      {showCorrect && (isCheckedOptionB(activeStep) && takeAnswer[activeStep] !== id[activeStep].correctAnswer) ? 
                      (<CloseRoundedIcon className={classes.red} />):(null)}
                     <br/>
                    <FormControlLabel
                        control={<Radio
                        checked={isCheckedOptionC(activeStep)}
                        onChange={(event)=>{haldleOption(event, activeStep)}}
                        value={id[activeStep].optionC} />}
                        label={`${id[activeStep].optionC}`}
                        className={classes.radioLabelColor}
                    />
                     {showCorrect && id[activeStep].optionC === id[activeStep].correctAnswer ? (
                        <CheckRoundedIcon  className={classes.green} />
                      ):(null)}
                      {showCorrect && (isCheckedOptionC(activeStep) && takeAnswer[activeStep] !== id[activeStep].correctAnswer) ? 
                      (<CloseRoundedIcon className={classes.red} />):(null)}
                     <br/>
                    <FormControlLabel
                        control={<Radio
                        checked={isCheckedOptionD(activeStep)}
                        onChange={(event)=>{haldleOption(event, activeStep)}}
                        value={id[activeStep].optionD} />}
                        label={`${id[activeStep].optionD}`}
                         className={classes.radioLabelColor}
                    />
                     {showCorrect && id[activeStep].optionD === id[activeStep].correctAnswer ? (
                        <CheckRoundedIcon  className={classes.green} />
                      ):(null)}
                      {showCorrect && (isCheckedOptionD(activeStep) && takeAnswer[activeStep] !== id[activeStep].correctAnswer) ? 
                      (<CloseRoundedIcon className={classes.red} />):(null)}
                  </DialogContent>
                  <DialogActions>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button variant="contained" color="secondary" onClick={handleNext}>
                        {activeStep === id.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                      {showCorrect && <Button color="secondary" variant="contained" onClick={handleReset}>Reset</Button>
}
                  <IconButton>
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                  </DialogActions>
                  </div>
                )}
          </Dialog>
        </div>
      );
    },[id, open, activeStep, classes, showCorrect,
      isCheckedOptionA, isCheckedOptionB, isCheckedOptionC, isCheckedOptionD, handleNext, handleClose, showResult, handleBack, handleReset, haldleOption]);

    return(
        <div className={classes.link}>
         <AppBar position="static" color="secondary" className={classes.noShadow}>
          <Box pt={1} pl={2} pb={1} pr={1}>
            <b>{headerMessage}</b>
          </Box>
          <Divider className={classes.divider} />
        </AppBar>
        <List dense className={classes.tabContainer}>
          {
            testSeries.length === 0 ? (
            <ListItem key={testSeries.length}>
              <ListItemText>
                <div className={classes.question}><b>{errorMessage}</b></div>
              </ListItemText>
            </ListItem>
          ) :(
            testSeries.map((physics, index) => {
              return(
               <div key={index}>
               <ListItem
                divider={index !== testSeries.length - 1}
                button className={classes.btn}
                onClick={()=>{handleClickOpen(index)}}
                 >
                  <ListItemAvatar style={{marginTop: "20px"}}>
                     <Avatar src={physics.active ? physics.src : null }/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={physics.text}
                    secondary={physics.date}
                  />
              </ListItem>
               </div>
             )}))
             }
             {open && showQuestion()}
        </List>  
        </div>
    )
}

ShowPhysic.propTypes = {
    classes: PropTypes.object.isRequired,
    testSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
    headerMessage: PropTypes.string,
    errorMessage: PropTypes.string
  };
export default withStyles(styles, { withTheme: true })(ShowPhysic);

import React, { Fragment, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Grid, TextField, Box, Paper, DialogContent, Typography, withStyles} from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";

const maxWidth="md";

const styles = theme => ({
  helpPadding: {
    "@media (max-width:  400px)": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  imgWrapper: { position: "relative"},
  img: {
    width: "100%",
    height: "110px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullWidth: {
    width: "100%"
  },
  relative: {
    position: "relative"
  },
  fileInput: {
    position: "relative",
    marginTop: "20px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 230,
  },
  active: {
    marginTop: "20px",
    position: "relative"
  }
});

function EditNotification(props) {
  const {
    pushMessageToSnackbar,
    onClose,
    messages,
    editId,
    theme,
    helpPadding,
    classes,
    fetchRandomMessages
  } = props;
  
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [value, setValue] = useState();
  const [desp, setDesp] = useState();
  const [choosedDate, setChooseDate] = useState();
  const [state, setState] = useState(null);
 

  useEffect(()=>{
   let index =messages.findIndex((element) => element._id === editId);
    const message = messages[index];
      setSelectedFile(message.src);
      setValue(message.notification);
      setChooseDate(message.date);
      setState(message.active);
      setDesp(message.text)
  },[messages, editId, setSelectedFile, setValue, setChooseDate, setDesp, setState]);
   
  const handleChange = useCallback((event) => {
    setState(event.target.checked);
  },[setState]);

  const handleUpload = useCallback(async() => {
    setLoading(true);
    const message = {
      src: selectedFile,
      date: choosedDate,
      text: desp,
      notification: value,
      active: state
    };
    let res= await axios.post(`/api/editNotification/${editId}`, message);
    setTimeout(() => {
      res.data ? (
        pushMessageToSnackbar({
          text: "Your notification has been updated.."
        })
      ) : (
        pushMessageToSnackbar({
          text: "Your notification has not been updated.."
        })
      )
      fetchRandomMessages();
      onClose();
    }, 2000);
  }, [setLoading, choosedDate,editId, selectedFile, fetchRandomMessages, value, desp, state, onClose, pushMessageToSnackbar]);

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

 const handleTextDescription = useCallback(
  event => {
    const { target } = event;
    const { value } = target;
    setDesp(value);
  },[setDesp]);

  const handleTextFieldChange = useCallback(
    event => {
      const { target } = event;
      const { value } = target;
      setValue(value);
    },[setValue]);

      const handleDate = useCallback(
        event => {
          const { target } = event;
          const { value } = target;
          setChooseDate(value);
        },[setChooseDate]);

  return (
    <Fragment>
    <form onSubmit={e =>{
         e.preventDefault();
      handleUpload();
      }}>
      <Box pt={1}>
       <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth], backgroundColor: "#bcbbd4" }}>
           <DialogContent classes={helpPadding ? { root: classes.helpPadding } : null}>
           <Typography paragraph variant="h5" style={{color: "rebeccapurple"}}>Update Notification</Typography>
           <Box mb={2}>
          <Grid spacing={0} container>
          <Grid item xs={12} sm={9} lg={8} className={classes.relative} >
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Message" 
            rows={4}
            onInput={handleTextFieldChange}
            value={value}
          />
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
        <div className={classes.imgWrapper}>
          <img
            alt="uploaded item"
            src={selectedFile}
            className={classes.img}
          />
        </div>
        </Grid>
      </Grid>
        <Grid spacing={0} container>
        <Grid item xs={12} sm={6} lg={4} className={classes.fileInput}>
           <input
                accept="image/*"
                onChange={onImageChange}
                multiple
                name="image"
                type="file"
              />  </Grid>
         <Grid item xs={12} sm={4} lg={4} className={classes.active}>
          <FormGroup>
              <FormControlLabel
               control={<Switch checked={state} onChange={handleChange} />}
              label="Active"
            />
          </FormGroup>
         </Grid>
         <Grid item xs={12} sm={4} lg={4}>
          <div className={classes.fileInput}>
          <TextField
              label="Enter Date And Time" 
              variant="outlined"
              value={choosedDate}
              onInput={handleDate}
            />
         </div>
       </Grid>
        </Grid>

        <Grid spacing={0} container>
        <Grid item xs={12} sm={9} lg={8} className={classes.active}>
        <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Description" 
            onInput={handleTextDescription}
            value={desp}
          />
        </Grid>
       </Grid>

        <Grid spacing={0} container style={{marginTop: "20px"}}>
        <Grid>
             <Button onClick={onClose} variant="contained" disabled={loading}>
                Back
              </Button>
       </Grid>
       <Grid style={{marginLeft: "5px"}}>
          <Button
              type="submit"
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
    </form>
    </Fragment>
  );
}

EditNotification.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  helpPadding: PropTypes.bool,
  editId: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRandomMessages: PropTypes.func.isRequired,

};

export default withStyles(styles, { withTheme: true })(EditNotification);

/*

     const deleteResult = useCallback(() => {
    setIsDeleteResultDialogLoading(true);
    setTimeout(() => {
      const _results =[...messages];
      const index =_results.findIndex((element) => element.id === count);
      _results.splice(index, 1);
      setResults(_results);
      pushMessageToSnackbar({
        text: "Your result has been deleted",
      });
      closeDeletePostDialog();
    }, 1500);
  }, [ 
    messages,
    setResults,
    count,
    setIsDeleteResultDialogLoading,
    pushMessageToSnackbar,
    closeDeletePostDialog,
  ]);

*/
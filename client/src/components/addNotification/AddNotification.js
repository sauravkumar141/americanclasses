import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Grid, TextField, Box, Paper, DialogContent, Typography, withStyles} from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";
import image from '../../dummy_data/images/image9.jpg';

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
  despc: {
    marginTop: "20px"
  },
  active: {
    marginTop: "20px",
    position: "relative"
  }
});

function AddNotifications(props) {
  const {
    pushMessageToSnackbar,
    onClose,
    theme,
    helpPadding,
    classes,
    fetchRandomMessages
  } = props;

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(image);
  const [value, setValue] = useState("");
  const [desp, setDesp] = useState("");
  const [choosedDate, setChooseDate] = useState("");
  const [state, setState] = useState(false);

  const handleChange = useCallback((event) => {
    setState(event.target.checked);
  },[setState]);

  const handleUpload = useCallback(async() => {
    setLoading(true);
    const data = {
      src: selectedFile,
      date: choosedDate,
      text: desp,
      notification: value,
      active: state
    };
    let res= await axios.post('/api/saveNotification', data);
  
    setTimeout(() => {
      res.data ? (
        pushMessageToSnackbar({
          text: "Your notification has been saved.."
        })
      ) : (
        pushMessageToSnackbar({
          text: "Your notification has not been saved.."
        })
      )
      fetchRandomMessages();
      onClose();
    }, 2000);
  }, [setLoading, choosedDate, selectedFile, fetchRandomMessages, value, desp, state, onClose, pushMessageToSnackbar]);

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

  const handleTextFieldChange = useCallback(
    event => {
      const { target } = event;
      const { value } = target;
      setValue(value);
    },[setValue]);

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

  return (
    <Fragment>
    <form onSubmit={e =>{
         e.preventDefault();
      handleUpload();
      }}>
      <Box pt={1}>
       <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth], backgroundColor: "#bcbbd4" }}>
           <DialogContent classes={helpPadding ? { root: classes.helpPadding } : null}>
           <Typography paragraph variant="h5" style={{color: "rebeccapurple"}}>Upload Message</Typography>
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
        <Grid item xs={12} sm={4} lg={4} className={classes.fileInput}>
        <input
                accept="image/*"
                onChange={onImageChange}
                multiple
                name="image"
                type="file"
              /> </Grid>
        <Grid item xs={12} sm={4} lg={4} className={classes.active}>
          <FormGroup>
              <FormControlLabel
               control={<Switch checked={state.active} onChange={handleChange} />}
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
              Upload {loading && <ButtonCircularProgress />}
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

AddNotifications.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  helpPadding: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchRandomMessages: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddNotifications);

/*

   handleSubmit = e => {
    e.preventDefault();

    const { bookID, bookTitle, bookAuthor } = this.state;

    const book = {
      bookID,
      bookTitle,
      bookAuthor,
    };

    axios
      .post('http://localhost:3001/create', book)
      .then(() => console.log('Book Created'))
      .catch(err => {
        console.error(err);
      });
  };


       const existingUser= await User.findOne({googleId: profile.id})

*/
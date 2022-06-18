import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Grid, TextField, Box, Paper, DialogContent, Typography, DialogActions, withStyles} from "@material-ui/core";
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
  imgWrapper: { position: "relative" },
  img: {
    width: "100%",
    height: "151px",
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
  despc: {
    marginTop: "20px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 230,
  }
});

function AddPost(props) {
  const {
    pushMessageToSnackbar,
    onClose,
    helpPadding,
    theme,
    classes,
    fetchRandomBlogPost
  } = props;

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(image);
  const [value, setValue] = useState("");
  const [desp, setDesp] = useState("");
  const [choosedDate, setChooseDate] = useState();

  const handleUpload = useCallback(async() => {
    setLoading(true);
    const post = {
      src: selectedFile,
      datetime: choosedDate,
      name: desp,
      message: value
    };

    let res= await axios.post('/api/saveBlogPost', post);
    setTimeout(() => {
      res.data ? (
        pushMessageToSnackbar({
          text: "Your BlogPost has saved.."
        })
      ) : (
        pushMessageToSnackbar({
          text: "Your BlogPost has not saved.."
        })
      )
      fetchRandomBlogPost();
      onClose();
    }, 2000);
  },[setLoading, choosedDate, desp, selectedFile, fetchRandomBlogPost, value, onClose, pushMessageToSnackbar]);

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
       <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
          <DialogContent
            classes={helpPadding ? { root: classes.helpPadding } : null}>
           <Typography paragraph variant="h6">
                Add BlogPost
           </Typography>
           <Box mb={2}>
          <Grid spacing={0} container>
          <Grid
          item
          xs={12}
          sm={9}
          lg={10}
          className={classes.relative}
        >
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="BlogPost Message..." 
            rows={6}
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
       <div>
          <input type="file" onChange={onImageChange} />
        </div>
        <div>
        <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Description" 
            onInput={handleTextDescription}
            value={desp}
            className={classes.despc}
          />
        </div>
        <div style={{marginTop: "20px"}}>
          <TextField
              label="Enter Date And Time" 
              variant="outlined"
              value={choosedDate}
              onInput={handleDate}
            />
        </div>
        </Box>
            <Box pb={2} pr={2}>
            <DialogActions
              classes={classes.fullWidth}>
             <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}>
              Save {loading && <ButtonCircularProgress />}
            </Button>
            </DialogActions>
          </Box>
          </DialogContent>
      </Paper>
    </Box>
    </form>
    </Fragment>
  );
}

AddPost.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  onClose: PropTypes.func,
  helpPadding: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchRandomBlogPost: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AddPost);
/*
 const fileSelectedHandler = useCallback(event => {
     let files = event.target.files;
     let reader = new FileReader();
     reader.readAsDataURL(files[0]);
     reader.onload = e =>{
       setSelectedFile(e.target.result);
     }
  }, [setSelectedFile]);

  **************************************************************
     <input type="file" onChange={fileSelectedHandler1} />

          <div className={classes.imgWrapper}>
          <img
            alt="uploaded item"
            src={selectedFile}
            className={classes.img}
          />
        </div>

*/

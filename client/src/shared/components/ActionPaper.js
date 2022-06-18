import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  helpPadding: {
    "@media (max-width:  400px)": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  fullWidth: {
    width: "100%"
  }
});

function ActionPaper(props) {
  const {
    theme,
    classes,
    title,
    content,
    maxWidth,
    actions,
    helpPadding,
    fullWidthActions
  } = props;
  return (
    <Box pt={1}>
      <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
        {title && <DialogTitle>{title}</DialogTitle>}
      
      
          <DialogContent
            classes={helpPadding ? { root: classes.helpPadding } : null}
          >
        
           <Typography paragraph variant="h6">
        Upload Image
      </Typography>
      <Box mb={2}>
       <h1>Hello Post</h1>
      </Box>
             <Box pb={2} pr={2}>
            <DialogActions
              classes={{ action: fullWidthActions ? classes.fullWidth : null }}
            >
             <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={files.length === 0 || loading}
            >
              Upload {loading && <ButtonCircularProgress />}
            </Button>
            </DialogActions>
          </Box>
       
          </DialogContent>
        
        
      
      </Paper>
    </Box>
  );
}

ActionPaper.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string
  ]),
  content: PropTypes.element,
  maxWidth: PropTypes.string,
  actions: PropTypes.element,
  helpPadding: PropTypes.bool,
  fullWidthActions: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(ActionPaper);





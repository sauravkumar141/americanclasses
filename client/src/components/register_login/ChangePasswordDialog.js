import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from 'axios';
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../shared/components/VisibilityPasswordTextField";


const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },
  dialogActions: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

function ChangePassword(props) {
  const { onClose, classes, adminLogin, setStatus, status } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginEmail = useRef();
  const loginPassword = useRef();
  const newPassword = useRef();

  const sendPasswordEmail = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    adminLogin.map(async admin => {
      if(loginEmail.current.value !== admin.email){
        setTimeout(() => {
          setStatus("invalidEmail");
          setIsLoading(false);
        }, 1000);
      } else if (loginPassword.current.value !== admin.password) {
        setTimeout(() => {
          setStatus("invalidPassword");
          setIsLoading(false);
        }, 1000);
      } else if (newPassword.current.value.length < 11) {
        setTimeout(() => {
          setStatus("tooShortPassword");
          setIsLoading(false);
        }, 1000);
      }
       else {
         let newpass = await axios.post(`/api/editAdminPassword/${admin._id}`, {password: newPassword.current.value});
         newpass.data ? setStatus("passwordChanged") : setStatus("passwordNotChanged");
        setIsLoading(false);
        onClose();
        setTimeout(() => {
          setStatus(null);
        },4000);
      }
     })
  }, [setIsLoading, setStatus, adminLogin, onClose]);

  return (
    <Dialog
      open
      hideBackdrop
      onClose={onClose}
      disableBackdropClick={isLoading}
      disableEscapeKeyDown={isLoading}
      maxWidth="xs"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPasswordEmail();
        }}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography  paragraph>
            <b> Enter Previous Email And Password, And Create New Strong Password...!!</b>
          </Typography>
          <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Previous Email "
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidEmail" &&
                "This email is not matched with previous one..."
              }
              FormHelperTextProps={{ error: true }}
            />

            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Previous Password "
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    This password is not matched with previous one...
                  </span>
                ) : ("")
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />

            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "tooShortPassword"}
              label="New Password"
              inputRef={newPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "tooShortPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "tooShortPassword" ? (
                  <span>
                    Enter Strong Password above 10 digits...!!!
                  </span>
                ) : ("")
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            Reset password
            {isLoading && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ChangePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setStatus: PropTypes.func.isRequired,
  adminLogin: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(ChangePassword);

import React, { useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter} from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  withStyles
} from "@material-ui/core";
import FormDialog from "../../shared/components/FormDialog";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../shared/components/VisibilityPasswordTextField";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    adminLogin,
    openChangePasswordDialog,
    status
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();

  const logins = () => {
    setIsLoading(true);
    setStatus(null);
   adminLogin.map(admin=> {
    if (loginEmail.current.value !== admin.email) {
        setStatus("invalidEmail");
        setIsLoading(false);
    } else if (loginPassword.current.value !== admin.password) {
        setStatus("invalidPassword");
        setIsLoading(false);
    } else {
      localStorage.setItem('checkAdmin', 'successAdmin*#141');
      history.push("/login/dashboard");
    }
    return null;
   })
 
  };

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          logins();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Email Address"
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
                "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
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
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
          
            {status === "passwordChanged" ? (
              <HighlightedInformation>
               Password has changed....!!!
              </HighlightedInformation>
            ) : (null)}
            {status === "passwordNotChanged"? (
              <HighlightedInformation>
               Password has not changed....!!!
              </HighlightedInformation>
            ):("")}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if ((!isLoading && event.keyCode === 13) ||event.keyCode === 32){
                  openChangePasswordDialog();
                 }
              }}
            >
              Forgot Password?
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
  adminLogin: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(withStyles(styles)(LoginDialog));

import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  FormHelperText,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from "@material-ui/core";
import axios from 'axios';
import FormDialog from "../../shared/components/FormDialog";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../shared/components/VisibilityPasswordTextField";

const styles = (theme) => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function RegisterDialog(props) {

  const { setStatus, theme, onClose, openTermsDialog, status, classes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [hasMobileNumber, setHasMobileNumber] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [autoSelect, setAutoSelect] = useState(false);
  const [value, setValue] = useState('female');
  const [clas, setClas] = useState('10');

  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();
  const studentName = useRef();
  const fatherName = useRef();
  const address = useRef();
  const studentId = useRef();
  const mobileNumber = useRef();

 const handleGender = useCallback((event) =>{
     setValue(event.target.value)
 },[setValue]);

 const handleClass = useCallback((event) =>{
  setClas(event.target.value)
},[setClas]);

  const register = useCallback(async() => {
    if(!registerTermsCheckbox.current.checked) {
      setHasTermsOfServiceError(true);
      return;
    }
    if(registerPassword.current.value !== registerPasswordRepeat.current.value)
     {
      setStatus("passwordsDontMatch");
      return;
    }

    if(registerPassword.current.value.length < 3)
    {
     setStatus("passwordTooShort");
     return;
   }
   
    if(mobileNumber.current.value.length !==10)
    {
      setHasMobileNumber(true);
      setAutoSelect(true)
      setTimeout(()=>{
        setHasMobileNumber(false);
      },3000)
      return;
   }
      setStatus(null);
      setIsLoading(true);
      var userdata = {
      studentName: studentName.current.value,
      fatherName: fatherName.current.value,
      address: address.current.value,
      mobileNumber: mobileNumber.current.value,
      gender: value,
      class: clas,
      studentId: studentId.current.value,
      password: registerPassword.current.value
    }
    let res= await axios.post('/api/saveStudentRegister', userdata);
    setTimeout(() => {
      res.data ? setStatus("accountCreated") : setStatus("notaccountCreated");
      setIsLoading(false);
      setTimeout(()=>{
        onClose();
      },2000)
    },1500);
  },[
    setIsLoading,
    setStatus,
    value,
    clas,
    onClose,
    setAutoSelect,
    setHasTermsOfServiceError,
    setHasMobileNumber,
    registerPassword,
    mobileNumber,
    registerPasswordRepeat,
    registerTermsCheckbox
  ]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="Register"
      onFormSubmit={(e) => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
   
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={studentName}
            label="Student Name"
            autoFocus
            autoComplete="off"
            type="text"
          />

           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={fatherName}
            label="Father Name"
            autoComplete="off"
            type="text"
          />

           <TextField
            required
            fullWidth
            multiline
            inputRef={address}
            margin="normal"
            variant="outlined"
            label="Full Address" 
            rows={2}
            autoComplete="off"
            type="text"
          />

            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={mobileNumber}
            label="Mobile Number"
            autoComplete="off"
            type="number"
          />
            {autoSelect && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1),
              }}
            >
              <b>Please enter only 10 digits Number...!!</b>
            </FormHelperText>
          )}

     <FormControl style={{marginTop: "10px"}}>
      <FormLabel><b>Gender</b></FormLabel>
      <RadioGroup value={value} onChange={handleGender}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
     </FormControl>
     <FormControl style={{marginTop: "10px", marginLeft: "40px"}}>
      <FormLabel><b>Select Class</b></FormLabel>
      <RadioGroup value={clas} onChange={handleClass}>
        <FormControlLabel value="10" control={<Radio />} label="10" />
        <FormControlLabel value="9" control={<Radio />} label="9" />
      </RadioGroup>
     </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            inputRef={studentId}
            label="Create Student Id"
            autoComplete="off"
            type="text"
          />

          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Password"
            inputRef={registerPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Repeat Password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a strong password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <FormControlLabel
            style={{ marginRight: 0 }}
            control={
              <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                  setHasTermsOfServiceError(false);
                }}
              />
            }
            label={
              <Typography variant="body1">
                I agree to the
                <span
                  className={classes.link}
                  onClick={isLoading ? null : openTermsDialog}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(event) => {
                    // For screenreaders listen to space and enter events
                    if (
                      (!isLoading && event.keyCode === 13) ||
                      event.keyCode === 32
                    ) {
                      openTermsDialog();
                    }
                  }}
                >
                  {" "}
                  terms of service
                </span>
              </Typography>
            }
          />
          {hasTermsOfServiceError && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1),
              }}
            >
              In order to create an account, you have to accept our terms of
              service.
            </FormHelperText>
          )}
          {status === "accountCreated" ? (
            <HighlightedInformation>
             Your data is saved....
            </HighlightedInformation>
          ) : (null)}
          {status === "notaccountCreated" ? (
            <HighlightedInformation>
              Data not saved ....
            </HighlightedInformation>
          ) : (null)}
          {hasMobileNumber? (
            <HighlightedInformation>
              Something is wrong. Please Check your data....!!!
            </HighlightedInformation>
          ) : (null)}
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          Register
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);

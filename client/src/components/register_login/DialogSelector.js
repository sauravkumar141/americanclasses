import React, { useState, useEffect, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import RegisterDialog from "./RegisterDialog";
import TermsOfServiceDialog from "./TermsOfServiceDialog";
import LoginDialog from "./LoginDialog";
import Blog from '../blogs/Blog';
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "./ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    openTermsDialog,
    openRegisterDialog,
    openLoginDialog,
    openChangePasswordDialog,
    onClose
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [adminLogin, setAdminLogin] = useState();

  const fetchAdminLogin = useCallback(async() => {
    let res= await axios.get('/api/getAdmin');
    setAdminLogin(res.data);
  }, [setAdminLogin]);

  useEffect(() => {
    fetchAdminLogin();
  },[fetchAdminLogin]);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    setRegisterStatus(null);
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      case "blog":
        return (
          <Blog/>
        );
      case "register":
        return (
          <RegisterDialog
            onClose={_onClose}
            openTermsDialog={openTermsDialog}
            status={registerStatus}
            setStatus={setRegisterStatus}
          />
        );
      case "termsOfService":
        return <TermsOfServiceDialog onClose={openRegisterDialog} />;
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            adminLogin={adminLogin}
            setStatus={setLoginStatus}
            openChangePasswordDialog={openChangePasswordDialog}
          />
        );
      case "changePassword":
        return (
          <ChangePasswordDialog
             status={loginStatus}
             setStatus={setLoginStatus}
            adminLogin={adminLogin}
            onClose={openLoginDialog}
          />
        );
      default:
    }
  }, [
    dialogOpen,
    openChangePasswordDialog,
    openLoginDialog,
    openRegisterDialog,
    openTermsDialog,
    adminLogin,
    _onClose,
    loginStatus,
    registerStatus,
    setLoginStatus,
    setRegisterStatus,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

DialogSelector.propTypes = {
  dialogOpen: PropTypes.string,
  openLoginDialog: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  openRegisterDialog: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired
};

export default DialogSelector;

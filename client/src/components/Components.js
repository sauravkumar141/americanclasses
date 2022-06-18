import React from "react";
import Header from "../components/Header/Header";
import DialogSelector from "./register_login/DialogSelector";
import HomeRouting from "./HomeRouting";

class Components extends React.Component {
  
  state ={dialogOpen: null}

   openRegisterDialog = () =>{ 
    this.setState({dialogOpen: "register"});
  }

  openChangePasswordDialog= ()=> {
    this.setState({dialogOpen: "changePassword"});
  }

  openLoginDialog = ()=> { 
    this.setState({dialogOpen: "login"});
  }

  closeDialog = ()=> {
    this.setState({dialogOpen: null});
  }

  openTermsDialog = ()=> {
    this.setState({dialogOpen: "termsOfService"});
  }

  render(){
    return (
      <div>
        <DialogSelector
          openLoginDialog={this.openLoginDialog}
          dialogOpen={this.state.dialogOpen}
          onClose={this.closeDialog}
          openTermsDialog={this.openTermsDialog}
          openRegisterDialog={this.openRegisterDialog}
          openChangePasswordDialog={this.openChangePasswordDialog}
        />
        <Header
          openLoginDialog={this.openLoginDialog}
          openRegisterDialog={this.openRegisterDialog}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 250,
            color: "midnightblue",
          }}
        />
        <HomeRouting />
      </div>
    );                        
  }
}

export default Components;

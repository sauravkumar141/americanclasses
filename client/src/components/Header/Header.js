import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import logo3 from "../../dummy_data/images/logo3.png";
import HeaderLinks from "./HeaderLinks";
import styles from "../../assets/jss/material-kit-react/components/headerStyle";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  const { color, openLoginDialog, openRegisterDialog, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button className={classes.title}>
              {" "}
              <img src={logo3} alt="img1" width="100" height="100" />
              <b>निर्माण Classes </b>
            </Button>
          </Link>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks
            openLoginDialog={openLoginDialog}
            openRegisterDialog={openRegisterDialog}
          />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            <HeaderLinks
              openLoginDialog={openLoginDialog}
              handleDrawerToggle={handleDrawerToggle}
              openRegisterDialog={openRegisterDialog}
            />
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

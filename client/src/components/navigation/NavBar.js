import React, { Fragment, useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  Hidden,
  Tooltip,
  Box,
  withStyles,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WbIncandescentSharpIcon from "@material-ui/icons/WbIncandescentSharp";
import ImageIcon from "@material-ui/icons/Image";
import Notifications from "@material-ui/icons/Notifications";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import MessagePopperButton from "./MessagePopperButton";
import NavigationDrawer from "../../shared/components/NavigationDrawer";

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.common.black,
  },
  smBordered: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50% !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  text: {
    color: "white",
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: "center",
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

function NavBar(props) {
  const {
    selectedTab,
    messages,
    fetchRandomMessages,
    history,
    classes,
  } = props;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const logOut = () => {
    localStorage.clear();
    history.push("/")
  }

  const menuItems = [
    {
      link: "/login/dashboard",
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : classes.text
            }
            fontSize="small"
          />
        ),
        mobile: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : classes.text
            }
          />
        ),
      },
    },
    {
      link: "/login/posts",
      name: "Posts",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ImageIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : classes.text
            }
            fontSize="small"
          />
        ),
        mobile: (
          <ImageIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : classes.text
            }
          />
        ),
      },
    },
    {
      link: "/login/notifications",
      name: "Notifications",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <Notifications
            className={
              selectedTab === "Notifications"
                ? classes.textPrimary
                : classes.text
            }
            fontSize="small"
          />
        ),
        mobile: (
          <Notifications
            className={
              selectedTab === "Notifications"
                ? classes.textPrimary
                : classes.text
            }
          />
        ),
      },
    },
    {
      link: "/login/results",
      name: "Results",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <EmojiEventsIcon
            className={
              selectedTab === "Results" ? classes.textPrimary : classes.text
            }
            fontSize="small"
          />
        ),
        mobile: (
          <EmojiEventsIcon
            className={
              selectedTab === "Results" ? classes.textPrimary : classes.text
            }
          />
        ),
      },
    },
    {
      link: "/login/testseries",
      name: "Test Series",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <WbIncandescentSharpIcon
            className={
              selectedTab === "Test Series" ? classes.textPrimary : classes.text
            }
            fontSize="small"
          />
        ),
        mobile: (
          <WbIncandescentSharpIcon
            className={
              selectedTab === "Test Series" ? classes.textPrimary : classes.text
            }
          />
        ),
      },
    },
    {
      name: "Logout",
      onClick: logOut,
      icon: {
        desktop: (
          <PowerSettingsNewIcon
            className={
              selectedTab === "Logout" ? classes.textPrimary : classes.text
            }
            fontSize="small"
          />
        ),
        mobile: (
          <PowerSettingsNewIcon
            className={
              selectedTab === "Logout" ? classes.textPrimary : classes.text
            }
          />
        ),
      },
    },
  ];
  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                American
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                Classes
              </Typography>
            </Hidden>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <MessagePopperButton
              messages={messages}
              fetchRandomMessages={fetchRandomMessages}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                key={index}
                onClick={element.onClick}
              >
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  fetchRandomMessages: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NavBar));

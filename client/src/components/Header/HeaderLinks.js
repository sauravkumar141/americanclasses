/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {Instagram, Facebook, YouTube} from '@material-ui/icons';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import { EmojiEvents } from "@material-ui/icons";
// core components
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import Button from "../../components/CustomButtons/Button";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const {openLoginDialog, handleDrawerToggle, openRegisterDialog} = props;
  const menuItems = [
    {
      name: "Register",
      onClick: openRegisterDialog
    },
    {
      name: "Admin Login",
      onClick: openLoginDialog
    }
  ];

  const socialIcon = [
      {
        id: "instagram-twitter",
        title: "Follow us on twitter",
        href: "https://www.youtube.com/c/BiharBoardGuruji",
        icon: (<YouTube />)
      },
      {
        id: "instagram-facebook",
        title: "Follow us on Facebook",
        href: "https://m.facebook.com/profile.php?id=100007653226903&ref=content_filter",
        icon: (<Facebook />)
      },
      {
        id: "instagram-tooltip",
        title: "Follow us on Instagram",
        href: "https://www.instagram.com/kr_amit96/",
        icon: (<Instagram />)
      }
  ]

  const subjectOption=[
    {name: "Physics", link: "/show/physics"},
    {name: "Chemistry", link: "/show/chemistry"},
    {name: "Biology", link: "/show/biology"},
    {name: "History", link: "/show/history"},
    {name: "Geography", link: "/show/geography"},
    {name: "Civics", link: "/show/civics"},
    {name: "Math", link: "/show/math"},
    {name: "Sanskrit", link: "/show/sanskrit"},
    {name: "Hindi", link: "/show/hindi"},
  ]

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem} >
        <CustomDropdown
          noLiPadding
          onClick={handleDrawerToggle}
          buttonText="Test Series"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={EmojiEvents}
          dropdownList={
            subjectOption.map((subject, index)=>{
              return(
                <Link to={subject.link} className={classes.dropdownLink}>
                   {subject.name}
                </Link>
              )
            })
          }
        />
      </ListItem>
      {
        socialIcon.map((getIcon, index) => {
          return(
          <ListItem key={index} onClick={handleDrawerToggle} className={classes.listItem}>
            <Tooltip
              id={getIcon.id}
              title={getIcon.title}
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
              arrow
            >
              <Button
                href={getIcon.href}
                target="_blank"
                color="transparent"
                className={classes.navLink}
              >
                {getIcon.icon}
              </Button>
            </Tooltip>
          </ListItem>
          )
        })
      }
      <ListItem className={classes.listItem} onClick={handleDrawerToggle} >
         <Link  key="blog" to="/blog">
          <Button color="transparent" className={classes.navLink}>
             Blog
          </Button>
        </Link>
      </ListItem>
      <ListItem onClick={handleDrawerToggle} className={classes.listItem}>
      {menuItems.map((element, index) => {
                  return (
                  <Button
                    color="transparent"
                    onClick={element.onClick}
                    className={classes.navLink}
                    key={index}
                  >
                    {element.name}
                  </Button>
                );
                
              })}
      </ListItem>
    </List>
  );
}
HeaderLinks.prototype = {
  openLoginDialog: PropTypes.func.isRequired,
  openRegisterDialog: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,

}

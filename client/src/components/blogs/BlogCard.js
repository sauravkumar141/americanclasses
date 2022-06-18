import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { GridListTileBar, Card, Typography, Box, Link, withStyles } from "@material-ui/core";


const styles = theme =>({
    imageContainer: {
      paddingTop: "100%",
      position: "relative",
    },
    image: {
      position: "absolute",
      bottom: 0,
      height: "100%",
      width: "100%",
    },
    link: {
      transition: theme.transitions.create(["background-color"], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeInOut
      }),
      cursor: "pointer",
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.primary.dark
      }
    },
    noDecoration: {
      textDecoration: "none !important"
    },
    card: {
      boxShadow: theme.shadows[2]
    }
  });

function SelfAligningImage(props) {
  const {
    classes,
    src,
    title,
    timeStamp,
    message
  } = props;
  const img = useRef();
  const [readMore,setReadMore]=useState(false);
  var _message = message.split(" ").slice(0, 20).toString().replace(/,/g, " ");
  var messagelength = message.split(" ").length;
  const linkName = readMore ? ' Read Less << ':' Read More >> '

  const manageText = useCallback(() =>{
   
    if(messagelength > 20){
        return(
          <Link className={classes.noDecoration} onClick={()=>{setReadMore(!readMore)}}>
            <span className={classes.link} >{linkName}</span>
          </Link>
        )
    }else{ return(null)}
  }, [readMore, setReadMore, classes, messagelength, linkName]);

  return (
    <Card className={classes.card}>
    <div className={classes.imageContainer}>
      <img
        ref={img}
        className={classes.image}
        src={src}
        alt="blogpost"
      />
      {title && (
        <GridListTileBar
          title={title}
          subtitle={timeStamp}
        />
      )}
    </div>
     <Box p={2}>
     <Typography variant="body1" color="textSecondary">
        {!readMore && _message} {readMore && message}
        {manageText()}
     </Typography>
     </Box>
    </Card>
  );
}

SelfAligningImage.propTypes = {
  classes: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  timeStamp: PropTypes.number,
  roundedBorder: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(SelfAligningImage);

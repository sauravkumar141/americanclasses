import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { GridListTileBar, Card, Typography, Box, Link, withStyles } from "@material-ui/core";
import VertOptions from "./VertOptions";

const styles = theme =>({
    imageContainer: {
      paddingTop: "110%",
      overflow: "hidden",
      position: "relative",
    },
    image: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
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
    }
  });

function SelfAligningImage(props) {
  const {
    classes,
    src,
    title,
    timeStamp,
    options,
    roundedBorder,
    theme,
    message
  } = props;
  const img = useRef();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [readMore,setReadMore]=useState(false);
  var _message = message.split(" ").slice(0, 20).toString().replace(/,/g, " ");
  var messagelength = message.split(" ").length;
  const linkName=readMore?'Read Less << ':'Read More >> '

  const onLoad = useCallback(() => {
    setHasLoaded(true);
  }, [setHasLoaded, ]);

  const manageText = useCallback(() =>{
   
    if(messagelength > 20){
        return(
          <Link className={classes.noDecoration} onClick={()=>{setReadMore(!readMore)}}>
            <span className={classes.link} >{linkName}</span>
          </Link>
        )
    }else{ return(null)}
  }, [readMore, classes, setReadMore, linkName, messagelength]);

  return (
    <Card>
    <div className={classes.imageContainer}>
      <img
        style={{
          height: "100%",
          width: "100%",
          display: hasLoaded ? "block" : "none",
          borderRadius: roundedBorder ? theme.shape.borderRadius : 0,
        }}
        ref={img}
        className={classes.image}
        onLoad={onLoad}
        src={src}
        alt=""
      />
      {title && (
        <GridListTileBar
          title={title}
          subtitle={timeStamp}
          actionIcon={
            options.length > 0 && (
              <VertOptions color={theme.palette.common.white} items={options} />
            )
          }
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
  timeStamp: PropTypes.string,
  roundedBorder: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(SelfAligningImage);

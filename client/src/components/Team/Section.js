import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../Grid/GridItem";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import Facebook from "@material-ui/icons/Facebook";
import YouTube from "@material-ui/icons/YouTube";
import Instagram from "@material-ui/icons/Instagram";
import styles from "../../assets/jss/material-kit-react/components/teamStyle";

const useStyles = makeStyles(styles);

export default function Section(props) {
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return (
    <GridItem xs={12} sm={12} md={4}>
      <Card plain>
        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
          <img src={props.data.team} alt="..." className={imageClasses} />
        </GridItem>
        <h4 className={classes.cardTitle}>
          {props.data.name}
          <br />
          <small className={classes.smallTitle}>{props.data.title}</small>
        </h4>
        <CardBody>
          <p className={classes.description}>{props.data.paragraph}</p>
        </CardBody>
        <CardFooter className={classes.justifyCenter}>
          <Button
            href={props.data.socialMedia.youtubeLink}
            target="_blank"
            justIcon
            color="transparent"
            className={classes.margin5}
          >
            <YouTube />
          </Button>
          <Button
            href={props.data.socialMedia.instagramLink}
            target="_blank"
            justIcon
            color="transparent"
            className={classes.margin5}
          >
            <Instagram />
          </Button>
          <Button
            href={props.data.socialMedia.facebookLink}
            target="_blank"
            justIcon
            color="transparent"
            className={classes.margin5}
          >
            <Facebook />
          </Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

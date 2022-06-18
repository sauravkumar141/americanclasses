import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import img1 from '../../dummy_data//images/df.jpg';
import img2 from '../../dummy_data//images/kl.jpg';
import img3 from '../../dummy_data//images/gh.jpg';
import img4 from '../../dummy_data//images/ae.jpg';
import img5 from '../../dummy_data//images/aa.jpg';

import styles from "./marqueeStyle";

const useStyles = makeStyles(styles);

export default function SectionPills(props) {

  const classes = useStyles();

  return (
    <div >
      <div className={classes.contain}>
        <div id="navigation-pills">
          <GridContainer>
            <GridItem lg={12}>
            <marquee behavior="alternate" direction="left">
            <img src={img1} alt="img1" width="600" height="320" />
            <img src={img2} alt="img2" width="600" height="320" />
            <img src={img3} alt="img3" width="600" height="320" />
            <img src={img4} alt="img4" width="600" height="320" />
            <img src={img5} alt="img5" width="600" height="320" />
		        </marquee>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

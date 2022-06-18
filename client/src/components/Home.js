import React, { Fragment} from "react";
import Parallax from "../components/Parallax/Parallax";
import Services from '../components/Services/services';
import TeamSection from "../components/Team/TeamSection";
import About from "../components/About/About";
import styles from "../assets/jss/material-kit-react/components/components";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer";
import Footer from '../components/footer/Footer';
import SectionPills from '../components/notification/SectionPills';
import MarqueeBanner from '../components/marquee/marqueeBanner';

import classNames from "classnames";

const useStyles = makeStyles(styles);


function Home() {

  const classes = useStyles();
  
  return (
    <Fragment>
       <Parallax image={require("../assets/img/bg41.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h2 className={classes.title}>निर्माण Classes </h2>
                <h3 className={classes.subtitle}>
                  For Best Education With New Ways And GuidLines For 9th And 10th Classes.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionPills />
        <MarqueeBanner />
        <Services />
        <TeamSection />
        <About />
      </div>
      <Footer />
    </Fragment>
  );
}

export default Home;
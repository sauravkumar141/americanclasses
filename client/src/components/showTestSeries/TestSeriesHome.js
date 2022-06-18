import React, {useState, useEffect, useCallback, Fragment} from 'react';
import Parallax from '../Parallax/Parallax';
import classNames from "classnames";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import {Instagram, Facebook, YouTube} from '@material-ui/icons';
import TestSeriesRoute from './TestSeriesRoute';
import styles from '../../assets/jss/material-kit-react/views/profilePage';

const useStyles = makeStyles(styles);

function TestSeriesHome(){

    const classes = useStyles();
    const [testSeries, setTestSeries] = useState([]);

    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
      );

    const setSeries = useCallback(async() =>{
        let testSeries= await axios.get('/api/getTestSeries');
        setTestSeries(testSeries.data.reverse());
    },[]);

    useEffect(()=>{
        setSeries();
    },[setSeries])

    return(
        <Fragment>
           <Parallax small filter image={require("../../assets/img/saa.jpg")} />
           <div className={classNames(classes.main, classes.mainRaised)}>
               <div className={classes.container}>
               <GridContainer justify="center">
               <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={require('../../assets/img/faces/dr.jpg')} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Amit Kumar</h3>
                    <h5>Founder of Nirman Classes</h5>
                    <Button justIcon link className={classes.margin5}>
                       <Instagram />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                       <Facebook />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                       <YouTube />
                    </Button>
                  </div>
                </div>
               </GridItem>
               </GridContainer>
               </div>
               </div>
                <main>
                <TestSeriesRoute 
                      testSeries={testSeries}
                    />
                </main>
               
        </Fragment>
    )
}

export default TestSeriesHome;
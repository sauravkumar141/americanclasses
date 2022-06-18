import React, {useCallback, useState, useEffect} from 'react';
import Parallax from '../Parallax/Parallax';
import classNames from "classnames";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {useParams} from 'react-router-dom';
import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Instagram, YouTube, Facebook} from '@material-ui/icons';
import styles from '../../assets/jss/material-kit-react/views/profilePage';

const useStyles = makeStyles(styles);

function ShowNotification(props) {

    const classes = useStyles();
    const {id} = useParams();

    const [messages, setMessages] = useState([]);

    const fetchRandomMessages = useCallback(async() => {
      let notification= await axios.get('/api/getNotification');
       setMessages(notification.data.reverse());
    }, [setMessages]); 

    useEffect(() => {
      fetchRandomMessages();
    }, [fetchRandomMessages]);

    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );

    return(
        <div>
          <Parallax small filter image={require("../../assets/img/sa.jpg")} />
           <div className={classNames(classes.main, classes.mainRaised)}>
               <div className={classes.container}>
               <GridContainer justify="center">
               <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={require('../../assets/img/faces/rt.jpg')} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Kulwant Sir</h3>
                    <h4 style={{marginLeft: "-30px"}}>Founder of Nirman Classes</h4>
                    <Button  
                    href="https://www.youtube.com/c/BiharBoardGuruji" 
                    target="_blank" 
                    justIcon
                    className={classes.margin5}>
                       <YouTube />
                    </Button>
                    <Button 
                    href="https://www.instagram.com/kulwantpaswan" 
                    target="_blank" 
                    justIcon 
                    className={classes.margin5}>
                       <Instagram />
                    </Button>
                    <Button 
                    href="https://m.facebook.com/kulwant.paswan.9?fref=nf" 
                    target="_blank" 
                    justIcon 
                    className={classes.margin5}>
                       <Facebook />
                    </Button>
                  </div>
                </div>
               </GridItem>
               </GridContainer>
               </div>   
               </div> 
               {messages.map((message, index)=> {
                return(
                 message._id ===id ? (
                    <GridItem key={index} lg={12}>
                <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" className={classes.title} >
                        {message.text}
                    </Typography>
                      <b><p>{message.notification}</p></b>
                </CardContent>
                 </Card>
                </GridItem>
                  ) : (null)
                )
               })}
        </div>
    )
}

export default ShowNotification;
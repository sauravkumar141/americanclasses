import React from 'react';
import GridItem from "../../components/Grid/GridItem";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import styles from '../../assets/jss/material-kit-react/components/servicesStyle'


const useStyles = makeStyles(styles);

export default function Boxes (props){

const classes = useStyles();
const { title, description } = props;


    return(
        <GridItem xs={12} sm={6} md={6}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" className={classes.title} >
                        {title}
                    </Typography>
                    <b><p>{description}</p></b>
                </CardContent>
            </Card>
        </GridItem>
    )
}



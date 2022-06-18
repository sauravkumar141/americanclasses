import React, {useState, useCallback, useEffect} from 'react';
import Parallax from '../Parallax/Parallax';
import classNames from "classnames";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import {Instagram, Facebook, YouTube} from '@material-ui/icons';
import {Paper,TablePagination} from '@material-ui/core';
import BlogCard from "./BlogCard";
import {Grid,Box} from "@material-ui/core";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import styles from '../../assets/jss/material-kit-react/views/profilePage';

const useStyles = makeStyles(styles);

const rowsPerPage = 9;

function Blog (props){

  const [page, setPage] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const handleChangePage = useCallback((__, page) => {
      setPage(page);
    },[setPage]
  );

  const printImageGrid = () => {
    if (blogPosts.length > 0) {
      return (
        <Box p={1}>
          <Grid container spacing={1}>
            {blogPosts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element) => (
                <Grid item xs={12} sm={6} md={4} key={element.id}>
                  <BlogCard
                    src={element.src}
                    title={element.name}
                    timeStamp={element.datetime}
                    message = {element.message}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
    return (
      <Box m={2}>
        <HighlightedInformation>
          No posts added yet. Admin Please, Add Some New Posts For Your Viewers....!!!
        </HighlightedInformation>
      </Box>
    );
  };

  const fetchBlogPost = useCallback(async()=>{
    let blogs= await axios.get('/api/getBlogPost');
    setBlogPosts(blogs.data.reverse());
  },[]);

  useEffect(()=>{
    fetchBlogPost();
  },[fetchBlogPost])

    return (
        <div>
          <Parallax small filter image={require("../../assets/img/ty.jpg")} />
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
                    <h6>Founder of Nirman Classes</h6>
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
             
              <Paper>
                  {printImageGrid()}
                  <TablePagination
                    component="div"
                    count={blogPosts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page",
                    }}
                    onChangePage={handleChangePage}
                    classes={{
                      select: classes.dNone,
                      selectIcon: classes.dNone,
                      actions: blogPosts.length > 0 ? classes.dBlock : classes.dNone,
                      caption: blogPosts.length > 0 ? classes.dBlock : classes.dNone,
                    }}
                    labelRowsPerPage=""
                  />
              </Paper>
             
        </div>
    )
}

export default Blog;

/*

   <img src={require("../../assets/img/ty.jpg")} alt="img1" style={{height: "60%", width: "100%"}} />

*/
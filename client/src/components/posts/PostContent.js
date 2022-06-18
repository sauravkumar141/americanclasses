import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TablePagination,
  Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
  Box,
  withStyles,
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import axios from 'axios';
import SelfAligningImage from "../../shared/components/SelfAligningImage";
import HighlightedInformation from "../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../shared/components/ConfirmationDialog";

const styles = {
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
};

const rowsPerPage = 3;

function PostContent(props) {
  const {
    pushMessageToSnackbar,
    fetchRandomBlogPost,
    posts,
    openAddPostModal,
    openEditBlogPost,
    classes,
  } = props;
  const [page, setPage] = useState(0);
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(false);
  const [ids, setIds] = useState(0);

  const closeDeletePostDialog = useCallback(() => {
    setIsDeletePostDialogOpen(false);
    setIsDeletePostDialogLoading(false);
  }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);


  const deleteBlogPost = useCallback(async() => {
    setIsDeletePostDialogLoading(true);
    let res= await axios.post(`/api/deleteBlogPost/${ids}`);
    setTimeout(() => {
      res.data ? (
        pushMessageToSnackbar({
          text: "Your blogPost has  deleted.."
        })
      ) : (
        pushMessageToSnackbar({
          text: "Your blogPost has not  deleted.."
        })
      )
      fetchRandomBlogPost();
      closeDeletePostDialog();
    }, 2000);
  }, [ 
    ids,
    fetchRandomBlogPost,
    setIsDeletePostDialogLoading,
    pushMessageToSnackbar,
    closeDeletePostDialog
  ]);

  const onDelete = useCallback((ids) => {
    setIds(ids);
    setIsDeletePostDialogOpen(true);
  }, [setIds, setIsDeletePostDialogOpen]);

  const handleChangePage = useCallback(
    (__, page) => {
      setPage(page);
    },
    [setPage]
  );

  useEffect(()=>{
  },[posts])

  const printImageGrid = useCallback(() => {
    if (posts.length > 0) {
      return (
        <Box p={1}>
          <Grid container spacing={1}>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element) => (
                <Grid item xs={12} sm={6} md={4} key={element._id}>
                  <SelfAligningImage
                    src={element.src}
                    title={element.name}
                    timeStamp={element.datetime}
                    message = {element.message}
                    options={[
                      {
                        name: "Delete",
                        onClick: () => { onDelete(element._id)},
                        icon: <Delete />,
                      },
                      {
                        name: "Edit",
                        onClick: () => { openEditBlogPost(element._id)},
                        icon: <Edit />,
                      },
                    ]}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
 setTimeout(()=>(
  <Box m={2}>
  <HighlightedInformation>
    No posts added yet. Click on &quot;NEW&quot; to create your first one.
  </HighlightedInformation>
</Box>
 ),1000)
  }, [posts, openEditBlogPost, onDelete, page]);

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Your BlogPosts</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddPostModal}
          disableElevation
        >
          Add Post
        </Button>
      </Toolbar>
      <Divider />
      {printImageGrid()}

        <TablePagination
        component="div"
        count={posts.length}
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
          actions: posts.length > 0 ? classes.dBlock : classes.dNone,
          caption: posts.length > 0 ? classes.dBlock : classes.dNone,
        }}
        labelRowsPerPage=""
      />
  
      <ConfirmationDialog
        open={isDeletePostDialogOpen}
        title="Confirmation"
        content="Do you really want to delete the post?"
        onClose={closeDeletePostDialog}
        loading={isDeletePostDialogLoading}
        onConfirm={deleteBlogPost}
      />
      
    </Paper>
  );
}

PostContent.propTypes = {
  openAddPostModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  openEditBlogPost: PropTypes.func.isRequired,
  fetchRandomBlogPost: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(PostContent);

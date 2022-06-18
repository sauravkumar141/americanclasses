import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import PostContent from "./PostContent";
import axios from 'axios';
import AddPost from "./AddPost";
import EditBlogPost from './EditBlogPost';

var editId;
function Posts(props) {
  const {
    selectPosts,
    pushMessageToSnackbar,
  } = props;

  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
  const [isEditBlogPost, setIsEditBlogPost] = useState(false);
  const [posts, setPosts] = useState([]);

  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const openEditBlogPost = useCallback((ids) => {
    editId=ids;
    setIsEditBlogPost(true);
  },[setIsEditBlogPost]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
    setIsEditBlogPost(false);
  }, [setIsAddPostPaperOpen, setIsEditBlogPost]);
  
  const fetchRandomBlogPost = useCallback(async() => {
    let res= await axios.get('/api/getBlogPost');
    setPosts(res.data.reverse());
  }, [setPosts]);

  useEffect(() => {
    selectPosts();
    fetchRandomBlogPost();
  }, [selectPosts, fetchRandomBlogPost]);

  if (isAddPostPaperOpen) {
    return <AddPost
      onClose={closeAddPostModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      fetchRandomBlogPost={fetchRandomBlogPost}
    />
  }

  if (isEditBlogPost) {
    return <EditBlogPost
      onClose={closeAddPostModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      editId={editId}
      posts={posts}
      fetchRandomBlogPost={fetchRandomBlogPost}
    />
  }

  return <PostContent
    openAddPostModal={openAddPostModal}
    posts={posts}
    fetchRandomBlogPost={fetchRandomBlogPost}
    pushMessageToSnackbar={pushMessageToSnackbar}
    openEditBlogPost={openEditBlogPost}
  />
}

Posts.propTypes = {
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired,
};

export default Posts;

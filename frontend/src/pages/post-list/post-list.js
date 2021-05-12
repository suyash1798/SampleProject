import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import EditPost from "../../components/edit-post/edit-post";
import PostCard from "../../components/post-card/post-card";
import { AuthContext } from "../../store/auth";
import "./post-list.css";

function PostList() {
  const [posts, setPosts] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await axios.get("/post/all-post");
      setPosts(response.data);
    };
    getAllPosts();
  }, []);

  function onDeletePost(id) {
    setPosts(posts.filter((post) => post._id !== id));
  }
  
  const [openDialog,setOpenDialog] = useState(false)
  console.log(openDialog)
  function toggleDialog(status){
      setOpenDialog(status)
  }
  console.log(authCtx)
  if(!authCtx.user){
    return <Redirect to="/enter" />
  }

  return (
    <Fragment>
      <Container className="main-container">
        <Grid container direction="column" justify="space-between" spacing={4}>
          <Grid item>
            <Grid container direction="row" justify="flex-end">
              <Grid item>
                <Button variant="contained" color="primary" onClick={()=>toggleDialog(true)}>
                  Add Post
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              className="posts-grid"
              spacing={4}
            >
              {posts.map((post) => (
                <Grid item key={post._id}>
                  <PostCard post={post} onDeletePost={onDeletePost} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <EditPost isOpen={openDialog} toggleDialog={toggleDialog} post={{title:'',description:''}}/>
    </Fragment>
  );
}

export default PostList;

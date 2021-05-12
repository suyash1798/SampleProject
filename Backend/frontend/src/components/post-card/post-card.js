import { Button, Card, Grid } from "@material-ui/core";
import axios from "axios";
import { Fragment, useState} from "react";
import { getLocalStorageToken } from "../../shared/auth";
import EditPost from "../edit-post/edit-post";
import "./post-card.css";

function PostCard({ post, onDeletePost }) {
  const onDelete = async () => {
      console.log('yeeyyeeyyey')
    try {
      await axios.delete(`/post/delete-post/${post._id}`,{
        headers: { authorization: `Bearer ${getLocalStorageToken()}` },
      });
      console.log("HAHAHA");
      onDeletePost(post._id);
    } catch (e) {
      console.log(e);
    }
  }
  
  const [openDialog,setOpenDialog] = useState(false)
  console.log(openDialog)
  function toggleDialog(status){
      setOpenDialog(status)
  }
  

  return (
    <Fragment>
      <Card className="main-card">
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <h1>{post.title}</h1>
          </Grid>
          <Grid item>
            <p>{post.description}</p>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <Button variant="contained" color="primary" onClick={()=>toggleDialog(true)}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={()=>onDelete()}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Card>
      <EditPost isOpen={openDialog}  toggleDialog={toggleDialog} post={post}/>
    </Fragment>
  );
}

export default PostCard;

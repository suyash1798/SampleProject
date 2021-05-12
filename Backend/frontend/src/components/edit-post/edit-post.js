import { Dialog, DialogContent } from "@material-ui/core";
import { useState } from "react";
import { Button, Grid, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import "./edit-post.css";
import { getLocalStorageToken } from "../../shared/auth";

function EditPost({ isOpen, toggleDialog, post }) {
  let [title, setTitle] = useState(post.title);
  let [description, setDescription] = useState(post.description);
  console.log(title);

  //    useEffect(()=>{
  //     titleRef.current = {value:post.title};
  //     desRef.current = {value:post.title};
  //     console.log(titleRef);
  //    },[post])

  const handleTitle = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  };

  const onSave = async () => {
    const data = { title, description };
    if (post._id) {
      await axios.put(`/post/update-post/${post._id}`, data);
    } else {
      console.log("going to post");
      await axios.post(`/post/add-post/`, data, {
        headers: { authorization: `Bearer ${getLocalStorageToken()}` },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleDialog(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent className="main-dialog">
        <Grid container direction="column" spacing={2}>
          <form onSubmit={onSave}>
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <InputLabel>Title:</InputLabel>
                </Grid>
                <Grid item>
                  <TextField
                    name="title"
                    placeholder="Title"
                    variant="outlined"
                    value={title}
                    onChange={handleTitle}
                    className="post-fields"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <InputLabel>Description:</InputLabel>
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="description"
                    variant="outlined"
                    type="text"
                    multiline
                    value={description}
                    onChange={handleTitle}
                    className="post-fields"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className="post-fields"
                    type="submit"
                    color="primary"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default EditPost;

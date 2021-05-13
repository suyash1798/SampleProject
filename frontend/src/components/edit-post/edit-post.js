import { Dialog, DialogContent } from "@material-ui/core";
import { useState } from "react";
import { Button, Grid, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import "./edit-post.css";
import { getLocalStorageToken } from "../../shared/utils";

function EditPost({ isOpen, toggleDialog, post }) {
  let [title, setTitle] = useState(post.title);
  let [description, setDescription] = useState(post.description);
  console.log(title);
  const [errors, setError] = useState({});

  const onSave = async (event) => {
    if (!errors["title"] && !errors["description"]) {
      const data = { title, description };
      if (post._id) {
        await axios.put(`/post/update-post/${post._id}`, data);
      } else {
        console.log("going to post");
        await axios.post(`/post/add-post/`, data, {
          headers: { authorization: `Bearer ${getLocalStorageToken()}` },
        });
      }
      console.log('called')
      toggleDialog();
    }
  };

  const validations = (input, value) => {
    if (input === "title") {
      setTitle(value);
    } else {
      setDescription(value);
    }
    console.log(input, value);
    if (input === "title") {
      if (value.length < 5) {
        setError((error) => ({ ...error, title: "Enter a valid Title" }));
      } else {
        setError((error) => ({ ...error, title: null }));
      }
    }
    if (input === "description") {
      if (value.length < 5) {
        setError((error) => ({
          ...error,
          description: "Enter a valid Description",
        }));
      } else {
        setError((error) => ({ ...error, description: null }));
      }
    }
  };

  const onHandleChange = (event) => {
    validations(event.target.name, event.target.value);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleDialog}
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
                    {...(errors["title"] && {
                      helperText: errors["title"],
                      error: true,
                    })}
                    onChange={onHandleChange}
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
                    name="description"
                    variant="outlined"
                    type="text"
                    multiline
                    value={description}
                    {...(errors["description"] && {
                      helperText: errors["description"],
                      error: true,
                    })}
                    onChange={onHandleChange}
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

import React, { useState,useContext } from "react";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import db from "../../configs/firebase-config";
import AuthContext from "../../store/auth-context";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function CreateNote() {
    const authCtx = useContext(AuthContext);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const history = useHistory();
    const uId = authCtx.user.uid;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(uId);
    let postRef =db.collection("users").doc(uId).collection('notes');
    postRef.add({
        Title:title,
        Note:note,
    }).then(()=>{
        alert("Note Successfully Added");
        setTitle('');
        setNote('');
        history.push('/notes')
    }).catch(err=>{
        alert("Error Occured.Please Try Again")
        console.log(err);
    })

  };

  return (
    <div className="main_container">
      <Container size="sm">
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Create a New Note
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className={classes.field}
            onChange={(e) => setTitle(e.target.value)}
            label="Note Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
          <TextField
            className={classes.field}
            onChange={(e) => setNote(e.target.value)}
            label="Note Description"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
            fullWidth
            required
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}

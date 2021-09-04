import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import NotesSnippets from "./NotesSnippets";
import AuthContext from "../../store/auth-context";
import db from "../../configs/firebase-config";
import { makeStyles, Grid, Container, Typography,Button } from "@material-ui/core";
import LoadingSpinner from '../UI/LoadingSpinner'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    BackgroundColor: theme.palette.grey[200],
  },
  card: {
    padding: "0.5rem",
    boxShadow:
      "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px",
  },
}));

const Notes = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
      setTimeout(() => {
          
          setIsLoading(true);
          let notesRef = db
          .collection("users")
      .doc(authCtx.user.uid)
      .collection("notes");
      notesRef.onSnapshot(async (notes) => {
          let notesData = await notes.docs.map((post) => {
        let data = post.data();
        let { id } = post;
        let payload = {
          id,
          ...data,
        };
        return payload;
      });
      setNotes(notesData);
    });
    setIsLoading(false);
    console.log("notes are", notes);
    console.log(authCtx.user.uid);
}, 100);
  }, []);
  // const fetchNotes =async()=>{
  //     const response = db.collection('users').doc(authCtx.user.uid).collection('notes');
  //     const data = await response.get();
  //     data.docs.forEach(item=>{
  //         setNotes([...notes,item.data()])
  //     })
  // }
  // useEffect(() => {
  //     fetchNotes();
  // }, [])
  if(notes.length===0){
      return (
        <div className="notes_empty_container">
        <div className="centered"><Typography variant="h4">No Notes Found.Try Adding Notes</Typography></div>
        <div className="notes_empty_btn">
        <Button component={Link} variant="contained" to="/create-note" color="secondary" size="large" >Add Note</Button>
        </div>
        </div>

      );

  }

  return (
    <div className="notes_container">
      <Container className={classes.root}>
        <Grid container spacing={3}>
            {notes.map((note) => (
                 <NotesSnippets
                 key={note.id}
                 id={note.id}
                 title={note.Title}
                 content={note.Note}
                 />
                 ))}-
        </Grid>
      </Container>
    </div>
  );
};

export default Notes;

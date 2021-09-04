import React,{useContext} from "react";
import { Link } from "react-router-dom";
import {

  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AuthContext from "../../store/auth-context";
import db from "../../configs/firebase-config";

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

const NotesSnippets = (props) => {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);

  const noteDeleteHandler=()=>{
    console.log("clicked");
    let notesRef =db.collection('users').doc(authCtx.user.uid).collection('notes').doc(props.id)
    notesRef.delete().then(()=>{
      console.log("succesfully Deleted");
    }).catch(err=>console.log(err))
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" style={{ marginBottom: "1rem" }}>
            {props.title}
          </Typography>
          <Typography variant="subtitle1">{props.content}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{ marginLeft: "1rem" }}
            onClick={noteDeleteHandler}
          >
            Delete
          </Button>
          <Link style={{ marginLeft: "2rem" }} to={`/update-note/${props.id}`}>
            Edit
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NotesSnippets;

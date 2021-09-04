import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import { auth } from "../../configs/firebase-config";
import "./Login.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const loginHandler = async(e) => {
    setIsLoading(true);
    e.preventDefault();
     auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setTimeout(() => {
          history.push("./notes");
        }, 100);
      })
      .catch((err) => {
        alert("Error Occured" + err.message);
      });
    setIsLoading(false);
  };

  const classes = useStyles();
  return (
    <div className="login_container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={4} className={classes.paper}>
          {isLoading && <div className="centered"><LoadingSpinner /></div>}
          {!isLoading && (
            <React.Fragment>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate onSubmit={loginHandler}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center" >
                  <Grid item >
                    <Typography variant="subtitle1" style={{marginTop:"1rem"}}>Made by <Box component="span"style={{color:'#f50057'}} >Abhinav Siwal</Box></Typography>
                  </Grid>
                </Grid>
              </form>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </div>
  );
}

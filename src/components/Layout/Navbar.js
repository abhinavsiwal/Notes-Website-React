import React, { useState, useContext } from "react";
import {Link,useHistory} from 'react-router-dom'
import AuthContext from "../../store/auth-context";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";

const Navbar = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  const logoutHandler = () => {
    authCtx.logout();
    history.push('./login')
  };

  return (
    <Container>
      <AppBar color="secondary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Notes App
          </Typography>
          {isLoggedIn && (
            <React.Fragment>
              <Button color="inherit" component={Link} variant="outlined" to="/notes" s>Notes</Button>
              <Button color="inherit"component={Link} to="/create-note" variant="outlined" style={{margin:"0 6px"}} >Add Notes</Button>
              <Button
                color="primary"
                variant="contained"
                onClick={logoutHandler}
                component={Link}
                to="/login"
              >
                Logout
              </Button>
            </React.Fragment> 
          )}
          {/* {!isLoggedIn && (
            <Button color="primary" variant="contained" component={Link} to="/login">
              Login
            </Button>
          )} */}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;

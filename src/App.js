import React,{useContext} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login'
import './App.css';
import SignUp from './components/Auth/Signup';
import CreateNote from './components/CreateNotes/CreateNote'
import AuthContext from './store/auth-context';
import Notes from './components/Notes/Notes';
import UpdateNote from './components/CreateNotes/UpdateNotes'


function App() {
    const authCtx = useContext(AuthContext);
    const {isLoggedIn} = authCtx;
    // const uId = authCtx.user.uid;
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact>
            <Redirect to="/login"/>
        </Route>
        <Route path="/login" exact>
            {!isLoggedIn ? <Login /> :<Notes /> }
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
          <Route path="/notes" exact>
          <Notes />
        </Route>
        <Route path="/create-note" exact>
          <CreateNote />
        </Route>
        <Route path="/update-note/:id" >
          <UpdateNote />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;

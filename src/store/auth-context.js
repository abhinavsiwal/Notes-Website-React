import React,{useState,useEffect} from 'react';
import {auth} from '../configs/firebase-config'

const AuthContext=React.createContext({
    user:'',
    isLoggedIn:false,
    logout:()=>{},
})

export const AuthContextProvider=(props)=>{
    // let initialUser;
    // useEffect(() => {
    //     initialUser = JSON.parse(localStorage.getItem('user'));
    // }, []);
    
    const [user, setUser] = useState(auth.currentUser);
    useEffect(() => {       
        const unsubscribe= auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(user);
            }
            else{
                console.log("No user is Signed in ");
            }
        })
        return unsubscribe;
    }, [])
        // useEffect(() => {
    //     localStorage.setItem('user',JSON.stringify(user))
    // }, [user]);



    const isLoggedIn=Boolean(user);
    const logoutHandler=()=>{
        auth.signOut().then(()=>{
            setUser(false);
        })
    }

const contextValue={
    user,
    isLoggedIn,
    logout:logoutHandler,
}
return(
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
);

}

export default AuthContext;
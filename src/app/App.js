import React, { useState, useEffect } from "react";
import {Route, Switch, Redirect} from "react-router-dom"
import Login from "./components/login";
import Main from "./components/main";
import NavBar from "./components/navBar";
import UserPage from "./components/userPage";

import Users from "./components/users";

function App({userId}){
    return (  
        <>
       
      <NavBar/>
    <Switch>
             
        <Route path="/login" component={Login}  />
        <Route path="/users" component={Users}  />      
        <Route path="/users/:userId?" component={<UserPage userId={userId} />} />    
        <Route path="/" exact component={Main}  />        
    </Switch>
      
      
    
       </>      
   );
}

export default App;

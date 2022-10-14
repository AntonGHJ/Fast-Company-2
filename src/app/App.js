import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import NavBar from "./components/navBar";
import UserPage from "./components/userPage";

import Users from "./components/users";

function App () {
    return (
    <>       
        <NavBar/>
        
        <Switch>           
            <Route path="/login" component={Login}/>
            <Route path="/users/:userId" component={UserPage}/> 
            <Route path="/users" component={Users}/>            
            <Route path="/" exact component={Main}/>        
        </Switch>
    </>      
   );
}

export default App;

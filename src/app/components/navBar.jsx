import React from 'react';
import { Link } from 'react-router-dom';
import Bootstrap from "bootstrap"

const NavBar = () => {
    return ( 
        
   <>
    <button className='btn '><Link to="/">Main</Link></button>
    <button className='btn '><Link to="/login">Login</Link></button>
    <button className='btn '><Link to="/users">Users</Link></button>

   </>
        
     );
}
 
export default NavBar;
/*eslint-disable */
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(()=> {
        logOut()
    }, [])
    return ( <h1>Вы вышли из системы</h1> );
}
 
export default LogOut;
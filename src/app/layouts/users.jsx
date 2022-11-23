import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/userPage/editUserPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
   
    const { userId, edit } = useParams();
    
    return <> {
        (userId ? (
            edit? <EditUserPage/>
            : <UserPage userId={userId} />
            )
            : <UsersListPage />)}</>;
};

export default Users;



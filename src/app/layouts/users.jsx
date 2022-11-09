import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserEditPage from "../components/page/userPage/userEditPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
   
    const { userId, edit } = useParams();
    
    return <> {
        (userId ? (
            edit? <UserEditPage/>
            : <UserPage userId={userId} />
            )
            : <UsersListPage />)}</>;
};

export default Users;



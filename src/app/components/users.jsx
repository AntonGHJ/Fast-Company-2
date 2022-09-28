import { noConflict } from "lodash";
import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from 'prop-types';
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from './searchStatus'


const Users = ({ users, ...rest }) => {
    
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const[professions, setProfessions]=useState(api.professions.fetchAll())
    const [selectedProf, setSelectedProf]=useState()
    
    useEffect(() => {
        console.log('запрос отправлен')
       api.professions.fetchAll().then((data)=>setProfessions(data))                
    }, [])
    console.log(professions)
    //
    
    useEffect(()=>{
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) =>{
        console.log(item)
        setSelectedProf(item)        
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession)===JSON.stringify(selectedProf)
          ): users;
    /*const filteredUsers=selectedProf? 
    users.filter((user)=>user.profession===selectedProf):users*/
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () =>{setSelectedProf()}

    return (
        
        <div className="d-flex">
     
        {professions&& (
        <div className="d-flex flex-column flex-shrink-0 p-3">
   
            <GroupList 
            selectedItem={selectedProf}
            items = {professions} 
            
            onItemSelect = {handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
       
        </div>
    )}
          <div className="d-flex flex-column">
          <SearchStatus length={count} />
            {count > 0 && (
              
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Провфессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
               
            )}
             <div className="d-flex justify-content-center">
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            </div>
             </div>
           
            </div>
      
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    count: PropTypes.number,
    
};

export default Users;

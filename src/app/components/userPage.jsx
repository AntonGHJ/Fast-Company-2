import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';
import QualitiesList from './qualitiesList';

const UserPage = ({  history }) => {    
    
    const {userId} = useParams();
    const [user, setUser] = useState();
    
    useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  });
    
    const handleBack = () => {
    history.replace('/users');
  };
        if (user) {
            return (
        <div>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <QualitiesList qualities={user.qualities} />
            <h2>Completed Meetings: {user.completedMeetings}</h2>
            <h2>Rate: {user.rate}</h2>
            <button onClick={handleBack}>Все пользователи</button>
        </div>
    );
        } else {
            return <h3>Loading...</h3>;
    }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
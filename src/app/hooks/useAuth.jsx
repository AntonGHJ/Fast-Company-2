/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(
                url, { email, password, returnSecureToken: true }
                );
                setTokens(data);
                await createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                        )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(error.response.data.error);
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "???????????????????????? ?? ?????????? email ?????? ????????????????????" };
                    throw errorObject;
                }
            }
        };
    };
    async function logIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(
                url, { email, password, returnSecureToken: true }
                );
                setTokens(data);
                await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "???????????????????????? ?? ?????????? email ???? ????????????????????" };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "???????????? ????????????????" };
                    throw errorObject;
                }
            }
        };
    };
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/")
    }
    async function createUser(data) {
        try {
        const { content } = await userService.create(data);
        console.log(content);
        setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };
    async function updateUser(newData) {
        try {
            const { content } = await userService.update(newData);
            console.log(content)
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }finally{
            setLoading(false)
        }
    };
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else{
            setLoading(false)
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value ={{ signUp, logIn, logOut, updateUser, currentUser }}>
            { !isLoading ? children : 'Loading...' }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;

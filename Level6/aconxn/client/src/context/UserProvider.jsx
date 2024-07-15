import React, { useState, createContext } from "react";
import axios from "axios";

// Create a context for user
export const UserContext = createContext();

const userAxios = axios.create({
    baseURL: '/api/auth'
});

userAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

const UserProvider = (props) => {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        issues: []
    };

    const [userState, setUserState] = useState(initState);

    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;

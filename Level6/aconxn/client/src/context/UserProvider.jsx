// userprovider.jsx
import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

// Create a context for user
export const UserContext = createContext();

export const userAxios = axios.create({
    baseURL: '/api'
});

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, 
(error) => {
    return Promise.reject(error);
});

const safeParseJSON = (value) => {
    try {
        return value ? JSON.parse(value) : null
    } catch (error) {
        console.error('JSON parsing error: ', error);
        return null;
    }
}

const initState = {
    user: safeParseJSON(localStorage.getItem('user'))  || {},
    token: localStorage.getItem('token') || '',
    issues: [],
    errMsg: ''
}

export default function UserProvider({ children }) {
    const [userState, setUserState] = useState(initState);

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    async function signup(credentials) {
        resetAuthErr();
        try {
            console.log('Sending Signup request with credentials: ', credentials)
            const response = await userAxios.post('auth/signup', credentials);
            const { token, user } = response.data;
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        } catch (error) {
            console.error('Signup error: ', error)
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again later.";
            handleAuthErr(errorMessage);
            return false;
        }
    }

    async function login(credentials) {
        resetAuthErr();
        try {
            const response = await userAxios.post('auth/login', credentials);
            const { token, user } = response.data;
            setUserState(prevState => ({ 
                ...prevState,
                user,
                token
            }));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Username or Password are incorrect. Please try again.";
            handleAuthErr(errorMessage);
            return false;
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            token: '',
            user: {},
            errMsg: '',
            issues: []
        });
    }

    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    }

    const getUserIssues = async () => {
        try {
            const res = await userAxios.get('/main/issues/user');
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }));
        } catch (error) {
            console.log('Error fetching user issues: ', error);
        }
    }

    useEffect(() => {
        if (userState.token) {
            getUserIssues();
        }
    }, [userState.token]);

    return (
        <UserContext.Provider value={{ 
            userState, 
            signup,
            login,
            logout,
            isAuthenticated,
            getUserIssues,
            resetAuthErr
        }}>
            {children}
        </UserContext.Provider>
    );
}

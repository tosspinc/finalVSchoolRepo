    import React, { useState, createContext } from "react";
    import axios from "axios";

    // Create a context for user
    export const UserContext = createContext();

    const userAxios = axios.create({
        baseURL: '/api'
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

    const safeParseJSON = (value) => {
        try {
            return value ? JSON.parse(value) : null
        } catch (error) {
            console.error('JSON parsing error: ', error)
            return null
        }
    }

    const initState = {
        user: safeParseJSON(localStorage.getItem('user'))  || {},
        token: localStorage.getItem('token') || '',
        issues: [],
        errMsg: ''
    }

    export default function UserProvider({ children }) {
        const [userState, setUserState] = useState(initState)
        const [allIssues, setAllIssues] = useState([])
        const [comments, setComments] = useState([])

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
            resetAuthErr()  //resets all autherrors before trying to signup.
            try {
                console.log('Attempting signup with credentials: ', credentials)
                const response = await userAxios.post('auth/signup', credentials)
                const { token, user } = response.data
                console.log('Signup successful: ', user)
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                return true
            } catch (error) {
                const errorMessage = error.response?.data?.message || "An error occurred. Please try again later."
                console.error('Signup error: ', errorMessage)
                handleAuthErr(errorMessage)
                return false
            }
        }

        async function login(credentials) {
            resetAuthErr() //resets all autherrors before trying to log in.
            try {
                console.log('Attemptin to Login with credentials: ', credentials)
                const response = await userAxios.post('auth/login', credentials)
                const { token, user } = response.data
                console.log('Login was Successful: ', user)
                setUserState(prevState => ({ 
                    ...prevState,
                    user,
                    token
                }))
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                return true
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Username or Password are incorrect. Please try again."
                console.error('Login error: ', errorMessage)
                handleAuthErr(errorMessage)
                return false
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

        return (
            <UserContext.Provider value={{ 
                ...userState, 
                signup,
                login,
                logout,
                resetAuthErr
            }}>
                {children}
            </UserContext.Provider>
        );
    }

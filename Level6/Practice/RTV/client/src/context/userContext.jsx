import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Create a context for user
export const userContext = createContext();


// Create an instance of axios with a base url of '/auth', this simplifies
// my need to only have to use: userAxios.post('/login') as it fills in the rest for me
const userAxios = axios.create({
    baseURL: '/auth'
});

//sets up an interceptor request for the userAxios instance. requires two arguments.
//config is the first argument needed and modifies the configuration. 
//the const token is the second request and it grabs the users token that is stored in local storage.
//without using interceptors the token would have to be added manually each time when it is needed.
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    //checks if there is a token.
    if (token) {
        //this line sets the Authorization to bearer and use the users token.
        config.headers.Authorization = `Bearer ${token}`;
    }
    //this line returns the modified configuration request 
    return config;
    //the below section is the error handling.
}, error => {
    //Promise captures the error message and propagates it when and if needed later.
    return Promise.reject(error);
});



export function UserProvider ({ children }) {
    //initializes initState and holds the data in the initialState for the user Context.
    const initState = { 
        //retrieves user content is there is any and stores it locally if there is no data then it returns null.
        user: JSON.parse(localStorage.getItem('user')) || null, 
        // checks if there is a token for the user and if there is then stored locally. 
        //if there is no token then returns and empty string.
        token: localStorage.getItem('token') || '', 
        //initializes issues as and empty array and errMsg as an empty string.
        issues: [], 
        errMsg: "" 
    };
    

    const [userState, setUserState] = useState(initState);
    const [issues, setIssues] = useState([])
    const navigate = useNavigate();

    //declares an asychronous function called login and takes the argument of credentials. 
    const login = async (credentials) => {
        //the trycatch block handles code process and error function.
        try {
            //decares response as variable and awaits for Axios to process the post request.
            const response = await userAxios.post('/login', credentials);
            //extracts token and user data.
            const { token, user } = response.data;
            //debugging to ensure data is being captured.
            console.log("Login response user data:", user);
            //saves retrieved user data and users token and stores in local storage for use later.
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            //updates the userState which reflects logged in user and their token.
            setUserState({ ...userState, user, token });
            //after a successful login happens the user is sent to the homepage.
            navigate('/');
            //error handling process.
        } catch (error) {
            //if there is an error response it logs that response. if not error message then displays error.message.
            console.error('Error logging in:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    const signup = async (credentials) => {
        try {
            const response = await userAxios.post('/signup', credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserState({ ...userState, user, token });
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error.response ? error.response.data : error.message);
            throw error;
        }
    };


    //declares the logout function
    function logout() {
        //logs the message logout in the console to verify logout function is being called.
        console.log('logout')
        //if logout is successful then it removes the token and user data.
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //updates the userState to reflect user has logged out.
        setUserState({
            //resets user to an empty object.
            user: {},
            //resets token to an empty string.
            token: '',
            //resets issues to an empty array.
            issues: []
        })
        //navigates to the homepage after logging out.
        navigate('/')
    };

    const addIssue = async (newIssue) => {
        try{
            const response = await userAxios.post('/api/issues', newIssue)
            console.log("Added new issue:", response.data)
        } catch(error) {
            console.error('Error getting issue:', error.response ? error.response.data : error.message)
            throw error
        }    
    }

    const fetchIssues = async () => {
        try {
            const res = await userAxios.get('/api/issues')
            setIssues(res.data)
        } catch (error) {
            console.error('Error getting issue:', error.response ? error.response.data : error.message)
            throw error
        }
    }

    return (
        //a react context provider component.
        //provides a way to pass the data down the component tree.
        //ensure passing props without having to do manually at every level.
        <userContext.Provider value={{ 
                userState, 
                login, 
                signup, 
                logout, 
                addIssue,
                fetchIssues,
                issues
            }}>
            //allows child components nestled within the Provider tree 
            //to access the context of each component.
            {children}
        </userContext.Provider>
    );
};

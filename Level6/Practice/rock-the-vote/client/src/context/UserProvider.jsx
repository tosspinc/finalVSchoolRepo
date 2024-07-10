import React, { useState, createContext } from "react";
import axios from "axios";


// Creates a context for user.
export const UserContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

export default function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        issues: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initState);

    async function signup(creds) {
        try {
            const res = await userAxios.post('/api/auth/signup', creds)
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user,
                token: token,
                errMsg: ''
            }))
        } catch (error) {
            handleAuthErr(error.response?.data?.error || 'Signup failed');
        }
    }

    async function login(creds) {
        try {
            const res = await axios.post('/api/auth/login', creds);
            const { user, token } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user,
                token: token,
                errMsg: ''
            }));
            //getUserIssues();
        } catch (error) {
            handleAuthErr(error.response?.data?.error || 'Username or Password are incorrect.');
        }
    }

    async function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState(prevUserState => ({
            ...prevUserState,
            token: '',
            user: {},
            errMsg: ''
        }));
    }

    const isAuthenticated = () => {
        return !!localStorage.getItem('token')
    }

    const handleAuthErr = (errMsg) => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }));
    }

    const resetAuthErr  = () => {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }));
    }

    const getUserIssues = async () => {
        try {
            const res = await userAxios.get('/api/user/issues/person');
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }));
        } catch (error) {
            console.log("Error fetching user issues: ", error);
        }
    }

    const getAllIssues = async () => {
        try {
            const res = await userAxios.get('/api/user/issues');
            return res.data;
        } catch (error) {
            console.log('Error fetching all issues.', error);
            return []
        }
    }

    const addIssue = async (newIssue) => {
        try {
            const res = await userAxios.post('/api/user/issues', newIssue);
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }));
        } catch (error) {
            console.log(error);
        }
    }

    const editIssue = async (issueId, updatedIssue) => {
        try {
            const res = await userAxios.put(`/api/user/issues/post/${issueId}`, updatedIssue);
            setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.map(issue =>
                    issue._id === issueId ? res.data : issue
                )
            }));
        } catch (error) {
            console.log(error);
        }
    }

    const deleteIssue = async (issueId) => {
        try {
            await userAxios.delete(`/api/user/issues/${issueId}`);
            setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.filter(issue => issue._id !== issueId)
            }));
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpvote = async (issueId) => {
        try {
            const res = await userAxios.put(`/api/main/issues/upvotes/${issueId}`)
            console.log(res.data)
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const handleDownvote = async (issueId) => {
        try {
            const res = await userAxios.put(`/api/main/issues/downvotes/${issueId}`)
            console.log(res.data)
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
            }))
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            isAuthenticated,
            getUserIssues,
            getAllIssues,
            addIssue,
            editIssue,
            deleteIssue,
            handleAuthErr,
            resetAuthErr,
            handleUpvote,
            handleDownvote
        }}>
            {props.children}
        </UserContext.Provider>
    );
}
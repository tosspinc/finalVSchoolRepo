import React, { useState, createContext } from "react";
import axios from "axios";


// Creates a context for user.
export const UserContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default function UserProvider(props) {

    const initState = {
        user: localStorage.getItem('user') || {},
        token: localStorage.getItem('token') || '',
        issues: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initState);

    async function signup(creds) {
        try {
            const res = await axios.post('/auth/signup', creds);
            const { user, token } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user,
                token: token,
                errMsg: ''
            }));
        } catch (error) {
            handleAuthErr(error.response.data.error || 'Signup failed');
        }
    }

    async function login(creds) {
        try {
            const res = await axios.post('/auth/login', creds);
            const { user, token } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user,
                token: token,
                errMsg: ''
            }));
            getUserIssues();
        } catch (error) {
            handleAuthErr(error.response.data.error || 'Username or Password are incorrect.');
        }
    }

    //test comment

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

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }));
    }

    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }));
    }

    async function getUserIssues() {
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

    async function getAllIssues() {
        try {
            const res = await userAxios.get('/api/user/issues');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function addIssue(newIssue) {
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

    async function editIssue(issueId, updatedIssue) {
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

    async function deleteIssue(issueId) {
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

    async function handleUpvote(issueId){
        try {
            const res = await userAxios.put(`/api/main/issues/upvotes/${issueId}`)
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
                }
            })   
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDownvote(issueId){
        try {
            const res = await userAxios.put(`/api/main/issues/downvotes/${issueId}`)
            console.log(res.data)
            setAllIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    issues: prevUserState.issues.map(issue => issue._id ? res.data : issue)
                }
            })
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

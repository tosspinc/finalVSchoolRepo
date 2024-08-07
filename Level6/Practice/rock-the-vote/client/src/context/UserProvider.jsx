import React, { useState, createContext } from "react";
import axios from "axios";

// Creates a context for user.
export const UserContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const safeParseJSON = (value) => {
    try {
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('JSON parsing error:', error);
        return null;
    }
};

const initState = {
    user: safeParseJSON(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    issues: [],
    errMsg: ''
};

export default function UserProvider({ children }) {
    const [userState, setUserState] = useState(initState);
    const [allIssues, setAllIssues] = useState([])
    const [comments, setComments] = useState([])


    // const updateUserState = (newState) => {
    //     setUserState(prevState => ({
    //         ...prevState,
    //         ...newState
    //     }));
    // };

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }));
    };

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }));
    };

    async function signup(creds) {
        try {
            const response = await userAxios.post('/auth/signup', creds);
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
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again later.";
            handleAuthErr(errorMessage);
            return false;
        }
    }

    async function login(creds) {
        try {
            const res = await axios.post('/auth/login', creds);
            const { token, user } = res.data;
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
    };

    const getUserIssues = async () => {
        try {
            const res = await userAxios.get('/api/user/issues/person');
            console.log("Fetched Issues:", res.data);
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }));
        } catch (error) {
            console.log("Error fetching user issues: ", error);
        }
    };

    const getAllIssues = async () => {
        try {
            const res = await userAxios.get('/api/user/issues');
            setAllIssues(res.data)
        } catch (error) {
            console.log('Error fetching all issues.', error);
        }
    };

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
    };

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
    };

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
    };

    const handleUpvote = async (issueId) => {
        try {
            const res = await userAxios.put(`/api/user/issues/upvotes/${issueId}`);
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
            }))
            setAllIssues(prevAllIssues => prevAllIssues.map(issue => issue._id === issueId ? res.data : issue))
        } catch (error) {
            console.log(error)
        }
    };

    const handleDownvote = async (issueId) => {
        try {
            const res = await userAxios.put(`/api/user/issues/downvotes/${issueId}`);
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: prevUserState.issues.map(issue => issue._id === issueId ? res.data : issue)
            }))
            setAllIssues(prevAllIssues => prevAllIssues.map(issue => issue._id === issueId ? res.data : issue))
        } catch (error) {
            console.log(error)
        }
    };

    function getComment() {
        userAxios.get('/api/comments')
            .then(res => setComments(res.data))
            .catch(error => console.log(error))
    }

    const addComment = async (issueId, newComment) => {
        try {
            const res = await userAxios.post(`/api/comments/${issueId}`, newComment)
            setComments(prevComments => [...prevComments, res.data])
        } catch (error) {
            console.error('Error adding a comment: ', error);
        }
    };

    const deleteComment = async (issueId, commentId) => {
        try {
            await userAxios.delete(`/api/comments/${issueId}/${commentId}`)
            setUserState(prevState => ({
                ...prevState,
                issues: prevState.issue.map(issue =>
                    issue._id === issueId ? {
                        ...issue,
                        comments: issue.comments.filter(comment => comment._id !== commentId)
                    } : issue
                )
            }))
        } catch (error) {
            console.error("Error deleting comment.", error)
        }
    }

    const editComment = async (issueId, commentId, updatedComment) => {
        try {
            await userAxios.put(`/api/comments/${issueId}/${commentId}`, updatedComment)
            setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.map(issue =>
                    issue._id === issueId ? {
                        ...issue,
                        comments: issue.comments.map(comment =>
                            comment._id === commentId ? res.data : comment
                        )
                    } : issue
                )
            }))
        } catch (error) {
            console.error('Error editing comment', error)
        }
    }

    console.log(allIssues)

    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            issues: userState.issues,
            isAuthenticated,
            getUserIssues,
            getAllIssues,
            addIssue,
            editIssue,
            deleteIssue,
            handleAuthErr,
            resetAuthErr,
            handleUpvote,
            handleDownvote,
            addComment,
            deleteComment,
            editComment,
            comments,
            getComment,
            allIssues
        }}>
            {children}
        </UserContext.Provider>
    );
}

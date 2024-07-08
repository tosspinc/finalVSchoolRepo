import React, { useState, createContext } from "react";
import axios from "axios";


//creates a context for user.
export const UserContext = createContext()

//creates an instance of axios with a base url of '/auth', this simplifies with only 
//needing to use: userAxios.post('/login'), etc instead of needing to type everything again.
const userAxios = axios.create({
    baseURL: '/api/auth'
})

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorizaton = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

export default function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        issues: []
    }

    const [userState, setUserState] = useState(initState)

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    async function signup(creds) {
        try {
            const res = await userAxios.post('/signup', creds)
            const {user, token} = res.data
            localStorage.setItem('Token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user,
                token: token
            }))
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function login(creds) {
        try {
            const res = await userAxios.post('/login', creds)
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user: user,
                token: token
            }))
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    function logout(){
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    token: '',
                    user: {},
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value = {{
            ...useState,
            signup,
            login,
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}


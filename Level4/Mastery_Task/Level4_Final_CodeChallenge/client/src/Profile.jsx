import React from "react";
import { useContext } from "react";
import { UserContext} from './UserContext';

export default function Profile() {
    const {user} = useContext(UserContext)
    console.log(user)

    return (
        <div className='border'>
            <h2> Profile Page </h2>
            <h1> Welcome, {user} </h1>
            <button>Login</button>
        </div>
    )
}
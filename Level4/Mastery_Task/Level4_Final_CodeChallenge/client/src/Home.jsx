import React, { useContext } from "react";
import { UserContext } from './UserContext';

export default function Home() {
    const {user} = useContext(UserContext);
    return (
        <>
            <div className="border">
                <h1>Home Page</h1>
                <h2>This is the homepage for {user} </h2>
            </div>
        </>
    )
}
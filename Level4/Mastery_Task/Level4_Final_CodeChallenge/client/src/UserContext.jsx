import React, { useState } from 'react';

const UserContext = React.createContext();

function UserProvider(props) {
    const [user, setUser] = useState('vschooler2122')

    const login = () => {
        setUser('vschooler2122');
    }

    const logout = () => {
        setUser('');
    }

    return (
        <UserContext.Provider
            value={{
                user,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}

/*
import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = useState("vschooler2122");

  const login = () => {
    setUser("vschooler22");
  };

  const logout = () => {
    setUser("");
  };

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
*/
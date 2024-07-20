import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creates context for user
const TosspiContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const initState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || ''
}

export const TosspiWebsite = ({ children }) => {
  const [userState, setUserState] = useState(initState);
  const [inventory, setInventory] = useState([])

  const signup = async (credentials) => {
    try {
      const response = await axios.post('/auth/signup', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user))
      setUserState(prev => {
        return{
          ...prev,
          user,
          token
        }
      })
    } catch (error) {
      console.error('Error signing up.', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await userAxios.post('/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user))
      setUserState(prev => {
        return{
          ...prev,
          user,
          token
        }
      })
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    setUserState({
      user: {},
      token: ''
    });
  };

  const getInventory = async() => {
    try {
      const res = await userAxios.get('/api/inventory')
      setInventory(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TosspiContext.Provider value={{
      ...userState,
      signup,
      login,
      logout,
      getInventory,
      inventory
    }}>
      {children}
    </TosspiContext.Provider>
  );
};

export default TosspiContext;

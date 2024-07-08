import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//creates context for user
const TosspiContext = createContext();

//creates an instance of axios
const userAxios = axios.create({
  baseURL: '/auth/User'
})

userAxios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
  }, error => {
    return Promise.reject(error)
})

export const TosspiWebsite = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(sessionStorage.getItem('token') || "")
  const navigate = useNavigate()
  const [applianceParts, setApplianceParts] = useState([]);

  useEffect(() => {
    if (token) {
      userAxios.get('/')
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          console.error('Error fetching user: ', error)
        })
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await userAxios.post('/login', credentials)
      const { token, user } = response.data
      sessionStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      Navigate('/')
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setToken('')
    setUser(null)
    Navigate('/login')
  }

  return (
    <TosspiContext.Provider value={{ user, login, logout, applianceParts, setApplianceParts }}>
      {children}
    </TosspiContext.Provider>
  );
};

export default TosspiContext;


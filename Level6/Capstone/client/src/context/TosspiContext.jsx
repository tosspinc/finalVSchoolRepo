import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Creates context for user
const TosspiContext = createContext();

// Creates an instance of axios
const userAxios = axios.create({
  baseURL: 'http://localhost:9000/auth' // Ensure this points to your server
});

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const TosspiWebsite = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const navigate = useNavigate();
  const [applianceParts, setApplianceParts] = useState([]);

  useEffect(() => {
    if (token) {
      userAxios.get('/users') // Corrected endpoint
        .then(response => {
          console.log('Fetched user data:', response.data); // Log the user data
          setUser(response.data.find(u => u.token === token)); // Ensure the user data has a 'username' property
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [token]);

  const signup = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:9000/auth/signup', credentials); // Ensure this points to your server
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error('Error signing up.', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await userAxios.post('/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/login');
  };

  return (
    <TosspiContext.Provider value={{
      user,
      signup,
      login,
      logout,
      applianceParts,
      setApplianceParts
    }}>
      {children}
    </TosspiContext.Provider>
  );
};

export default TosspiContext;

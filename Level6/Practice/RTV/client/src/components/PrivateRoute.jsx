    import React, { useContext, Component } from 'react';
    import { Navigate } from 'react-router-dom';
    import { userContext } from '../context/userContext';

    const PrivateRoute = () => {
        const { userToken, children } = useContext(userContext);

        return userToken ? children : <Navigate to='/' />
    };

    export default PrivateRoute;

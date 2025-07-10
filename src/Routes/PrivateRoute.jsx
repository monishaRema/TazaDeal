import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Contex/AuthContex';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

const PrivateRoute = ({children}) => {

    const {user,loading} =use(AuthContext)
    const location= useLocation();



    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(!user){
        return <Navigate state={location.pathname}  to="/auth/login"></Navigate>
    }
    return children
};

export default PrivateRoute;
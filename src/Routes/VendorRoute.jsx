import React from 'react';

import { Navigate, useLocation } from 'react-router';

import useUserRole from '../Hooks/useUserRole';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

const AdminRoute = ({children}) => {

    const {role, isLoading} = useUserRole();
    const location= useLocation();



    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role != 'vendor'){
        return <Navigate state={location.pathname}  to="/auth/login"></Navigate>
    }
    return children
};

export default AdminRoute;
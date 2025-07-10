import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Contex/AuthContex';

const AdminRoute = ({children}) => {

    const {user,loading} =use(AuthContext)
    const location= useLocation();



    if(loading){
        return <div className="container mx-auto text-center py-15"><span className="loading loading-dots loading-2xl"></span></div>
    }
    if(!user){
        return <Navigate state={location.pathname}  to="/login"></Navigate>
    }
    return children
};

export default AdminRoute;
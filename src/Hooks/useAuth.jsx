import React, { use } from 'react';
import { AuthContext } from '../Contex/AuthContex';

const useAuth = () => {
    const authInfo = use(AuthContext)
    console.log(authInfo)
    return authInfo;
};

export default useAuth;
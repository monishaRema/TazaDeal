import React from 'react';
import useAuth from '../../Hooks/useAuth';

const Logout = ({classes}) => {
const { LogOut} = useAuth();
    const handleLogout = async () => {
        await LogOut()
    }
    return (
        <button className={classes} onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';

const Logout = ({classes}) => {
    const navigate = useNavigate()
const { LogOut, setUser} = useAuth();
    const handleLogout = async () => {
        await LogOut().then(() => {
             localStorage.removeItem("access-token");
             setUser(null);
             navigate('/auth/login')
        })
    }
    return (
        <button className={classes} onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
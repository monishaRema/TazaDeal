import React from 'react';
import useUserRole from '../../../Hooks/useUserRole';
import LoadingSpinner from '../../../Components/UI/LoadingSpinner';


const DashboardSidebar = () => {
    const {role, isLoading} = useUserRole();
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
           
        </div>
    );
};

export default DashboardSidebar;
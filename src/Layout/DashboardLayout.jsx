import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from '../Pages/Dashboard/Sidebar/DashboardSidebar';

const DashboardLayout = () => {
    return (
        <main>
            <div className="flex relative">
                <aside className='fixed left-0 top-0'><DashboardSidebar></DashboardSidebar></aside>
                <div className='main-section bg-white p-5 flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>

        </main>

            
    );
};

export default DashboardLayout;
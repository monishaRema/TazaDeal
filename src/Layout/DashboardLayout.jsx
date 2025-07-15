import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from '../Pages/Dashboard/Sidebar/DashboardSidebar';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
  const {user} = useAuth();
  return (
    <div className=" text-gray-800 min-h-screen flex relative border">
        {/* Sidebar */}
        <aside className="w-15 md:w-65 bg-white fixed top-0 bottom-0 left-0 z-40 px-2 md:px-5">
          <DashboardSidebar />
        </aside>
        {/* Main content */}
        <main className="w-full pl-15 md:pl-65 transition-all duration-300 bg-secondary relative">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md px-5 py-4 flex gap-5 items-center justify-between">
            
            <h1 className="text-lg font-semibold">Welcome back, {user?.displayName}</h1>
            <img src={user?.photoURL} alt="avatar" className='size-10 rounded-full object-cover'/>
            
          </header>

          {/* Main Outlet */}
          <section className="p-4 md:p-6 mb-15">
            <Outlet />
          </section>
          <footer className="w-full bg-white px-6 h-15 flex items-center justify-center text-center fixed bottom-0 left-5 right-5 rounded-md">
                <p>All the right reserved TazaDeal.</p>
          </footer>
        </main>
    </div>
  );
};

export default DashboardLayout;

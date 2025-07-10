import React from 'react';
import { Outlet } from 'react-router';
import DashboardSidebar from '../Pages/Dashboard/Sidebar/DashboardSidebar';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
  const {user} = useAuth();
  return (
    <main className="min-h-screen text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-15 md:w-65 bg-white min-h-screen fixed top-0 left-0 z-40 px-2 md:px-5">
          <DashboardSidebar />
        </aside>

        {/* Main content */}
        <div className="flex-1 ml-15 md:ml-65 transition-all duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">Welcome back, {user?.displayName}</h1>
            <img src={user?.photoURL} alt="avatar" className='size-10 rounded-full object-cover'/>
           
          </header>

          {/* Main Outlet */}
          <section className="p-6">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;

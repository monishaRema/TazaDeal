import React from 'react';
import LOGO from "../../assets/logo.svg"
const Logo = ({nav}) => {
    const isNav = nav ? "text-white" : "text-primary"; 
    return (
        <div className='flex gap-1 items-center'>
            <img src={LOGO} alt="Taza Deal Logo" className='size-15' />
            <h3 className='text-2xl font-bold flex flex-col'>
                <span className={isNav}>Taza</span>
                <span className="text-accent -mt-2">Deal</span>
            </h3>
        </div>
    );
};

export default Logo;
import React from 'react';
import LOGO from "../../assets/logo.svg"
const Logo = () => {
    return (
        <div className='flex gap-1 items-center'>
            <img src={LOGO} alt="Taza Deal Logo" className='size-15' />
            <h3 className='text-2xl font-bold flex flex-col'>
                <span className="text-primary">Taza</span>
                <span className="text-accent -mt-2">Deal</span>
            </h3>
        </div>
    );
};

export default Logo;
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex w-full justify-center items-center bg-transparent z-50  py-5 md:py-15">
      <motion.div
        className="w-10 h-10 md:w-20 md:h-20 bg-gradient-to-r from-primary to-white rounded-full flex items-center justify-center p-3"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
            <div className='size-full bg-[#ffffff] rounded-full'> 

            </div>
        </motion.div>
    </div>
  );
};

export default LoadingSpinner;
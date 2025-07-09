import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="flex w-full justify-center items-center bg-transparent z-50  py-15">
      <motion.div
        className="w-15 h-15 md:w-20 md:h-20 bg-gradient-to-r from-accent via-[#03377249] to-[#06041b] rounded-full flex items-center justify-center p-3"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
            <div className='size-full bg-[#06041b] rounded-full'> 

            </div>
        </motion.div>
    </div>
  );
};

export default Spinner;
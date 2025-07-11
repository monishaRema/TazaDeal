import React from 'react';

const NoItemsFound = ({items}) => {
    return (
        <div className=' text-xl w-full p-5 text-center bg-white rounded-md italic'>
            <p>No {items} found.</p>
        </div>
    );
};

export default NoItemsFound;
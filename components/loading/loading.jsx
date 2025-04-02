import React from 'react';

const Loader = () => {
    return (
        <div className='w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center loader'>
            <img src="/loading.png" className='w-[35px]' alt=""/>
        </div>
    );
};

export default Loader;
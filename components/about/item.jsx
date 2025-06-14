import React from 'react';

const Item = ({ title, profession, phone, avatar }) => {
    return (
        <div className="w-[340px] m-auto bg-[#4C4C4C] text-white rounded-xl overflow-hidden shadow-lg p-4">
            <img className="w-full h-[400px] object-cover rounded-lg mb-4" src={process.env.IMAGE_URL+avatar} alt={title}/>
            <div className="text-left">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-300">{profession}</p>
                <p className="text-gray-400 mt-2">{phone}</p>
            </div>
        </div>
    );
};

export default Item;

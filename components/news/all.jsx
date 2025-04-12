"use client"
import React, {useContext} from 'react';
import {NewsContext} from "@/providers/NewsProvider";
import ItemNews from "@/components/news/itemNews";

const All = () => {
    const {news} = useContext(NewsContext)
    return (
        <div className='w-full bg-[#232222] '>
           <div className='container mx-auto py-[180px]'>
           <h3 className="text-[23px] sm:text-[30px] font-semibold mb-4 text-[#C7C7C7]">News</h3>

               {news.map((item) => (
                   <div className='py-5' key={item.id}>
                       <ItemNews news={item}/>
                   </div>
               ))}
           </div>
       </div>
    );
};

export default All;
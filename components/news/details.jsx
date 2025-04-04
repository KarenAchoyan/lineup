"use client"
import React from 'react';
import ItemNews from "@/components/news/itemNews";
import {useApp} from "@/providers/AppProvider";
import parse from "html-react-parser";

const Details = ({news, lastNews}) => {
    const {lang} = useApp();

    const tit = (lang.toLowerCase() === "hy") ? news.title_hy : lang.toLowerCase() === "ge" ? news.title_ge : lang.toLowerCase() === "ru" ? news.title_ru : news.title_en;
    const content = (lang.toLowerCase() === "hy") ? news.content_hy : lang.toLowerCase() === "ge" ? news.content_ge : lang.toLowerCase() === "ru" ? news.content_ru : news.content_en;
    const slug = tit?.toLowerCase().replace(/\s+/g, "-"); // Convert title to slug

    return (
        <>
            <div className='w-full bg-[#232222] pt-[160px]'>
                <div className='container m-auto bg-[#4D4C4C] rounded-3xl'>
                    <div className='w-[80%] m-auto pb-[50px]'>
                        <h1 className='text-center my-5 pt-10 text-[45px] text-[#C7C7C7]'>News</h1>
                        <img  className='w-full' src={process.env.IMAGE_URL+news.avatar} alt={"News"}/>
                        <div className='w-[50%] py-10'>
                            <h1 className='text-[23px] sm:text-[30px] text-white font-bold'>{tit}</h1>
                        </div>
                        <div className='text-[20px] text-white '>
                            {parse(content)}
                        </div>
                    </div>

                </div>
                <h1 className='text-center text-[45px] text-[#C7C7C7] mt-[70px]'>Explore more</h1>
                {lastNews.map((item) => (
                    <div className='py-5' key={item.id}>
                        <ItemNews news={item}/>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Details;
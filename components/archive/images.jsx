"use client"
import React, {useContext} from 'react';
import {Image} from "antd";
import {ArchiveContext} from "@/providers/ArchiveProvider";

const Images = ({images, lang}) => {
    return (
        <div className="flex flex-wrap justify-between px-10">
            {images.map((gallery) => {
                const title = (lang.toLowerCase() === "hy") ? gallery.title_hy : lang.toLowerCase() === "ge" ? gallery.title_ge : lang.toLowerCase() === "ru" ? gallery.title_ru : gallery.title_en;

                return (
                    <div className="item-gallery w-full  sm:w-[48%] h-[360px] rounded-2xl  mb-10"
                         key={gallery.id}>
                        <Image src={process.env.IMAGE_URL + gallery.image} className='w-full h-[80%] object-cover'
                               preview={true}/>
                        <h3 className='text-[18px] text-white relative top-[-10px]'>
                            <a href={gallery.path ? gallery.path : "#"} className='underline'>
                                {title}
                            </a>
                        </h3>
                    </div>
                )
            })}
        </div>
    );
};

export default Images;
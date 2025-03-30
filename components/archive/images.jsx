"use client"
import React, {useContext} from 'react';
import {Image} from "antd";
import {ArchiveContext} from "@/providers/ArchiveProvider";

const Images = ({images}) => {
    return (
        <div className="flex flex-wrap justify-between px-10">
            {images.map((gallery) => {
                return (
                    <div className="item-gallery w-full  sm:w-[48%] h-[360px] rounded-2xl overflow-hidden mb-10"
                         key={gallery.id}>
                        <Image src={process.env.IMAGE_URL + gallery.image} className='w-full h-full object-cover'
                               preview={true}/>
                    </div>
                )
            })}
        </div>
    );
};

export default Images;
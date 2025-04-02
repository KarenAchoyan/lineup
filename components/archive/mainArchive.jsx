"use client"
import React, {useContext, useEffect, useState} from 'react';
import ArchiveComponent from "@/components/archive/carousel";
import Archive from "@/components/archive/archive";
import {message} from "antd";
import AppContext from "antd/es/app/context";
import {ArchiveContext} from "@/providers/ArchiveProvider";

const MainArchive = () => {
    const [year, setYear] = useState('');
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const {years} = useContext(ArchiveContext);

    return (
        <>
            <div className='container m-auto bg-[#4D4C4C] rounded-3xl pt-10 pb-[20px] mt-[50px]'>
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[45px]'>{year?.year} Archive</h1>
                <div>
                    <Archive images={images} year={year} videos={videos}/>
                </div>
            </div>
        </>

    );
};

export default MainArchive;
"use client"
import React, {useState} from 'react';
import ArchiveComponent from "@/components/archive/carousel";
import Archive from "@/components/archive/archive";
import {message} from "antd";

const MainArchive = () => {
    const [year, setYear] = useState('');
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const changeYears = async (year) => {
        setYear(year)
        try {
            const response = await fetch(`https://lineup.dahk.am/api/archives/${year.year}`);
            const data = await response.json();

            if (response.ok) {
                setImages(data?.images);
                setVideos(data?.videos);
            } else {
                message.error(data.message || 'Failed to fetch archives');
            }
        } catch (error) {
            message.error('Error while fetching data');
        }
    };
    return (
        <>
            <div className='container m-auto bg-[#4D4C4C] rounded-3xl pt-10 '>
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[45px]'>Archive</h1>
                <ArchiveComponent changeYears={changeYears}/>
            </div>

            <div className='container m-auto bg-[#4D4C4C] rounded-3xl pt-10 mt-[50px]'>
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[45px]'>{year?.year} Archive</h1>
                <div>
                    <Archive images={images} year={year} videos={videos}/>
                </div>
            </div>
        </>

    );
};

export default MainArchive;
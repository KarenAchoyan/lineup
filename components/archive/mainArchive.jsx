"use client"
import React, {useContext, useEffect, useState} from 'react';
import ArchiveComponent from "@/components/archive/carousel";
import Archive from "@/components/archive/archive";
import {message} from "antd";
import AppContext from "antd/es/app/context";
import {ArchiveContext} from "@/providers/ArchiveProvider";
import SearchDropdown from "@/components/archive/SearchDropdown";

const MainArchive = ({dict, lang}) => {
    const [year, setYear] = useState('2022');
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);

    // Load default 2022 archive data on component mount
    useEffect(() => {
        changeData('2022');
    }, []);

    const changeYears = async (year) => {
        setYear(year)
        try {
            const response = await fetch(`/api/archives?year=${year}`);
            const data = await response.json();

            if (response.ok) {
                return { images: data?.images, videos: data?.videos };
            } else {
                message.error(data.message || 'Failed to fetch archives');
            }
        } catch (error) {
            message.error('Error while fetching data');
        }
    };

    async function changeData(option){
        const data = await changeYears(option)
        if (data) {
            setImages(data.images || [])
            setVideos(data.videos || [])
        }
    }
    return (
        <>
            <div className='container m-auto bg-[#4D4C4C] rounded-3xl pt-10 pb-[20px] mt-[50px]'>
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[45px]'> {dict.archive}</h1>

                <div className='w-full sm:w-[650px] m-auto py-10 px-10'>
                    <SearchDropdown changeYear={changeData}/>
                </div>

                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[45px]'>{year} {dict.archive}</h1>
                <div>
                    <Archive images={images} year={year} videos={videos} dict={dict} lang={lang}/>
                </div>
            </div>
        </>

    );
};

export default MainArchive;
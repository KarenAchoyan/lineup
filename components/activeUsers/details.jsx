import React from 'react';
import {Image} from "antd";
import parse from "html-react-parser";

const Details = ({params, data, dict}) => {
    const title = (params.lang.toLowerCase() === "hy") ? data?.fullname_hy : params.lang.toLowerCase() === "ge" ? data?.fullname_ge : params.lang.toLowerCase() === "ru" ? data?.fullname_ru : data?.fullname_en;
    const content = (params.lang.toLowerCase() === "hy") ? data?.content_hy : params.lang.toLowerCase() === "ge" ? data?.content_ge : params.lang.toLowerCase() === "ru" ? data?.content_ru : data?.content_en;
    return (
        <>
            <div className='container m-auto bg-[#4D4C4C] rounded-3xl pt-20'>
                <h1 className='text-center my-5 text-[32px]  md:text-[45px] text-[#C7C7C7] pb-10'>{dict.active_youth}</h1>
                <div className='w-[80%] m-auto pb-[50px]'>
                    <div className='text-center md:text-left'>
                        <div className='md:float-left mx-auto w-[300px] '>
                            <Image src={"/girl.jpeg"} width={250} height={250}
                                   className='rounded-full float-left m-3 mr-5'
                                   alt={"Avatar staff"}/>
                        </div>
                        <h2 className='text-[45px] text-[#F15A2B] font-bold'>{title}</h2>
                        <div className='text-[20px] text-white'>
                            {parse(content)}
                        </div>
                    </div>
                    <div className='flex justify-between flex-wrap'>
                        <div className='w-full sm:w-[48%] mt-10'>
                            <Image src={process.env.IMAGE_URL + JSON.parse(data.images)[0]} alt={"Image"}
                                   className='w-full  rounded-2xl'/>
                        </div>
                        <div className='w-full sm:w-[48%]'>
                            {JSON.parse(data.images).slice(1).map((item) => (
                                <div className='w-full md:h-[300px] mt-10 rounded-2xl overflow-hidden'>
                                    <Image src={process.env.IMAGE_URL+item} alt={"Image"} className='h-full w-full object-cover'/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;
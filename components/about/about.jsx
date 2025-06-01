import React from 'react';
import Item from "@/components/about/item";
import parse from "html-react-parser";
import Image from 'next/image';


const About = ({about, lang, staffs, dict}) => {
    const content = (lang.toLowerCase() === "hy") ? about.about_hy : lang.toLowerCase() === "ge" ? about.about_ge : lang.toLowerCase() === "ru" ? about.about_ru : about.about_en;

    return (
        <>
            <div className="container m-auto bg-[#4D4C4C] rounded-3xl mx-auto px-4 py-10 ">
                <h1 className='text-center my-5 text-[32px]  md:text-[45px] text-[#C7C7C7]'>{dict.about_us}</h1>
                <div className="relative w-full h-[300px] sm:h-[500px] w-full md:w-[700px] m-auto">
                    <Image
                        src="https://lineup.dahk.am/storage1/about.JPG"
                        alt="About"
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                </div>
                <div className='text-[20px] text-white my-10 text-center md:px-30'>
                    {parse(content)}
                </div>
            </div>
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {staffs.map((member, index) => {
                        const title = (lang.toLowerCase() === "hy") ? member.fullname_hy : lang.toLowerCase() === "ge" ? member.fullname_ge : lang.toLowerCase() === "ru" ? member.fullname_ru : member.fullname_en;
                        const profession = (lang.toLowerCase() === "hy") ? member.profession_hy : lang.toLowerCase() === "ge" ? member.profession_ge : lang.toLowerCase() === "ru" ? member.profession_ru : member.profession_en;
                        return (
                            <Item key={index} {...member} title={title} profession={profession} />
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default About;

"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {MainContext} from "@/providers/HomeProvider";
import Link from "next/link";
import {useApp} from "@/providers/AppProvider";

const UserCarousel = () => {
    const {users, dict} = useContext(MainContext)
    const {lang} = useApp();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        arrows: true,
        prevArrow: <CustomPrevArrow/>, // Custom arrow component
        nextArrow: <CustomNextArrow/>, // Custom arrow component
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="bg-[#232222] pt-20">
            <div
                className='container m-auto bg-[#4D4C4C] p-[20px] rounded-2xl  border-t-2 border-[#BF3206] h-auto  lg:h-[500px]'>
                <h2 className="text-[#C7C7C7] font-bold mb-6 text-center text-[32px]  md:text-[45px]">{dict.active_youth}</h2>
                <Slider {...settings} >
                    {users?.map((profile, index) => {
                        const title = (lang.toLowerCase() === "hy") ? profile.fullname_hy : lang.toLowerCase() === "ge" ? profile.fullname_ge : lang.toLowerCase() === "ru" ? profile.fullname_ru : profile.fullname_en;
                        const slug = title?.toLowerCase().replace(/\s+/g, "-"); // Convert title to slug

                        return (
                            <div key={index} className="flex justify-center rounded-full pt-10 ">

                                <div
                                    className="shadow-[4px_4px_16.9px_7px_#00000040]  w-50 h-50 sm:w-60 sm:h-60 rounded-full overflow-hidden border-t-2 border-[#F15A2B] hover:scale-110 transition cursor-pointer  duraction-1000 m-auto">
                                    <Link href={"/actives/" + slug}>
                                        <img src={process.env.IMAGE_URL + profile.avatar} alt={title}
                                             className="w-full h-full object-cover"/>
                                    </Link>
                                </div>

                                <p className="text-center mt-4 text-lg text-[#F5F5F5]">{title}</p>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
};

const CustomPrevArrow = ({onClick}) => (
    <button
        onClick={onClick}
        className="w-[40px] cursor-pointer h-[40px] sm:w-[60px] sm:h-[60px] flex items-center text-[#F15A2B] justify-center absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#C7C7C7] p-3 rounded-full hover:border-2 hover:border-[#F15A2B]"
    >
        <LeftOutlined className='text-[18px] sm:text-[24px] '/>
    </button>
);

const CustomNextArrow = ({onClick}) => (
    <button
        onClick={onClick}
        className="w-[40px] cursor-pointer h-[40px] sm:w-[60px] sm:h-[60px] flex items-center text-[#F15A2B] justify-center absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#C7C7C7] p-3 rounded-full hover:border-2 hover:border-[#F15A2B]"
    >
        <RightOutlined className='text-[18px] sm:text-[24px] '/>
    </button>
);

export default UserCarousel;

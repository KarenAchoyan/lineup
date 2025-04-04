"use client"
import {useContext} from "react";
import {MainContext} from "@/providers/HomeProvider";
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import parse from "html-react-parser";
import {truncateText} from "@/utils/utils";

const News = ({title=false}) => {
    const {lang,dict, news} = useContext(MainContext);
    const tit = (lang.toLowerCase() === "hy") ? news.title_hy : lang.toLowerCase() === "ge" ? news.title_ge : lang.toLowerCase() === "ru" ? news.title_ru : news.title_en;
    const content = (lang.toLowerCase() === "hy") ? news.content_hy : lang.toLowerCase() === "ge" ? news.content_ge : lang.toLowerCase() === "ru" ? news.content_ru : news.content_en;
    const slug = tit?.toLowerCase().replace(/\s+/g, "-"); // Convert title to slug

    return (
        <div className='w-full bg-[#232222] '>
            <div className={title ? "pt-20" : null}>
                <div
                    className='container m-auto bg-[#4D4C4C] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto   lg:h-auto'>
                    {title &&
                        <h2 className=" text-[#C7C7C7] font-bold mb-6 text-center text-[32px]  md:text-[45px]">{title}</h2>
                    }
                    <div className="flex flex-col md:flex-row items-start gap-8 ">
                        <div className="w-full md:w-1/2">
                            <img src={process.env.IMAGE_URL+news.avatar} className='w-full' alt=""/>
                        </div>
                        <div className="w-full md:w-1/2">
                            <Link href={'/news/'+slug}>
                                <h3 className="text-[23px] sm:text-[30px] font-semibold mb-4 text-[#C7C7C7]">{tit}</h3>
                            </Link>
                            <div className="text-[17px] sm:text-[20px]  font-medium text-white">
                                {parse(truncateText(content,250))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
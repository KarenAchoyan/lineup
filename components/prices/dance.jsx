"use client";
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useApp} from "@/providers/AppProvider";

const Dance = ({lessons, slug, dict, lang}) => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [selectedBranch, setSelectedBranch] = useState(dict.select_a_branch);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [data, setData] = useState(() => {
        return lessons
            .filter((lesson) => lesson.id == slug)
            .map((item) => {
                item.image_background = item.image_background.replace("\\", "/");
                return item;
            })[0];
    });

    const [styleBackground, setStyleBackground] = useState({
        backgroundImage: `url('')`
    });

    useEffect(() => {
        if (data?.image_background) {
            const fixedUrl = data?.image_background.replace(/\\/g, "/");
            const backgroundImage = `url('${process.env.IMAGE_URL}${fixedUrl}')`;
            setStyleBackground({backgroundImage});
        }
    }, [data?.image_background]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        console.log("Updated background:", styleBackground);
    }, [styleBackground]);

    const handleRegister = () => {
        if (selectedBranchId !== null) {
            // Store the data in localStorage before navigation
            localStorage.setItem('registrationData', JSON.stringify({
                branch_id: selectedBranchId,
                lesson_id: slug
            }));
            router.push('/auth/signUp');
        }
    };

    return (
        <div className="bg-[#211d1dfc] dance-background min-h-screen py-[120px] sm:py-[150px] lg:py-[180px]" style={styleBackground}>
            <h1 className="text-[30px] sm:text-[40px] text-[#C7C7C7] text-center mb-6 sm:mb-10 px-4">{data?.title}</h1>
            <div className="flex items-center justify-center px-4">
                <div className="container bg-[#4d4c4c2b] min-h-[600px] max-h-[800px] pt-[100px] sm:pt-[120px] lg:pt-[150px] rounded-lg shadow-xl p-6 sm:p-8 relative">
                    <div className="text-center flex flex-col items-center text-[#C7C7C7]">
                        <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold mb-2">{data?.price} GEL</h1>
                        <h2 className="font-light text-[18px] sm:text-[20px] lg:text-[24px] mb-2">{dict?.every_month}</h2>
                        <h2 className="font-light text-[16px] sm:text-[18px] lg:text-[24px] mb-6">{dict?.valid_for_12_months} {data?.months} {dict.months}</h2>
                        <div className="mt-10 w-full max-w-[400px]">
                            <div className="relative w-full">
                                <button
                                    ref={buttonRef}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="bg-[#4C4C4C] w-full text-[18px] sm:text-[20px] md:text-[25px] text-white py-3 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                >
                                    {selectedBranch}
                                </button>

                                {isDropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute bg-[#232222] top-full left-0 text-black rounded-lg shadow-lg mt-2 p-4 w-full z-50 transition-all duration-300 opacity-100 max-h-[300px] overflow-y-auto"
                                    >
                                        <ul>
                                            {data?.lesson_school.map((item) => {
                                                console.log(item);
                                                const name = lang === "en" ? item?.schools.name_en : lang==='ru' ? item?.schools.name_ru : lang==='hy' ? item?.schools.name : item?.schools.name_ge;
                                                return (
                                                <li
                                                    key={item.id}
                                                    className="py-2 text-left text-white hover:bg-[#4C4C4C] px-2 rounded cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedBranch(item?.schools.name);
                                                        setSelectedBranchId(item?.schools.id);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {name}
                                                </li>
                                            )})}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 w-full max-w-[400px]">
                                <button
                                    onClick={handleRegister}
                                    disabled={selectedBranchId === null}
                                    className="bg-[#4C4C4C] w-full text-[18px] sm:text-[20px] md:text-[25px] cursor-pointer disabled:cursor-default disabled:text-gray-500 disabled:hover:bg-[#4C4C4C] text-white py-3 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                >
                                    {dict.register}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dance;

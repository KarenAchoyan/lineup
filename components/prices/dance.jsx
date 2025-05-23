"use client";
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useApp} from "@/providers/AppProvider";

const Dance = ({lessons, slug, dict}) => {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [selectedBranch, setSelectedBranch] = useState(dict.select_a_branch);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const {lang} = useApp();

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
        <div className="bg-[#211d1dfc] dance-background h-screen py-[180px]" style={styleBackground}>
            <h1 className="text-[40px] text-[#C7C7C7] text-center mb-10">{data?.title}</h1>
            <div className="flex items-center justify-center">
                <div className="container bg-[#4d4c4c2b] min-h-[70vh] pt-[150px] rounded-lg shadow-xl p-8">
                    <div className="text-center flex flex-col items-center text-[#C7C7C7]">
                        <h1 className="text-[20px] sm:text-[40px] font-semibold">{data?.price} GEL</h1>
                        <h2 className="font-light text-[24px]">{dict?.every_month}</h2>
                        <h2 className="font-light text-[24px] mb-4">{dict?.valid_for_12_months}  {data?.months} {dict.months}</h2>
                        <div className="mt-10">
                            <div className="relative">
                                <button
                                    ref={buttonRef}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="bg-[#4C4C4C]  text-[20px] md:text-[25px] text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                >
                                    {selectedBranch}
                                </button>

                                {isDropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute bg-[#232222] top-[30px] left-0 text-black rounded-lg shadow-lg mt-4 p-4 w-full z-10 transition-all duration-300 opacity-100"
                                    >
                                        <ul>
                                            {data?.lesson_school.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="py-2 text-left text-white hover:bg-[#4C4C4C] px-2 rounded cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedBranch(item?.schools.name);
                                                        setSelectedBranchId(item?.schools.id);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {item?.schools.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="mt-[10px]">
                                <button
                                    onClick={handleRegister}
                                    disabled={selectedBranchId === null}
                                    className="bg-[#4C4C4C] w-[270px] text-[20px] md:text-[25px] cursor-pointer disabled:cursor-default disabled:text-gray-500 disabled:hover:bg-[#4C4C4C] text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
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

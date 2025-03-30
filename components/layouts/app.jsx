"use client"
import React, {useState} from 'react';
import Image from "next/image";
import {
    DownOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    FacebookFilled,
    MenuOutlined
} from "@ant-design/icons";
import Link from "next/link";
import {Drawer} from "antd";
import {usePathname, useRouter} from "next/navigation";
import {useApp} from "@/providers/AppProvider";

const App = ({children, lessons}) => {
    const router = useRouter();
    const pathname = usePathname();
    const {lang, setLang} = useApp();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('EN');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sectionsOpen, setSectionsOpen] = useState(false);

    const changeLanguage = (l) => {
        const pathnameParts = pathname.split("/");
        if (pathnameParts[1] !== l) {
            pathnameParts[1] = l; // Update the language part of the path
        }
        const newPathname = pathnameParts.join("/");
        router.push(newPathname);
    };

    const languages = [
        {code: 'en', text: "EN", label: 'English'},
        {code: 'ru', text: "RU", label: 'Russian'},
        {code: 'hy', text: "HY", label: 'Armenian'},
        {code: 'ge', text: "GE", label: 'Georgian'}
    ];
    return (
        <>
            <header className='absolute top-0 left-0 w-full z-10'>
                <div className="container m-auto h-[136px] flex items-center justify-between">
                    <div className='logo-parent'>
                        <Link href={"/" + lang}>
                            <Image src='/logo.png' alt={"Logo"} className='w-[200px] h-[141px]' width={800}
                                   height={800}/>
                        </Link>
                    </div>
                    <div className='menu-parent hidden lg:block'>
                        <div className='w-[95%] m-auto h-[64px] bg-[#434343] rounded-full relative'>
                            <ul className='flex h-full items-center justify-evenly relative'>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer relative '>
                                    <Link href={"/"+lang.toLowerCase()+'/about'}>
                                        About us
                                    </Link>
                                </li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>
                                    <Link href={"/"+lang.toLowerCase()+'/archive'}>
                                        Archive
                                    </Link>
                                </li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer relative dropdown'>
                                    <span>Sections</span>
                                    <div className='absolute hidden sub-dropdown  pt-3'>
                                        <ul className=' left-0 w-40 bg-[#211d1dfc] text-white rounded-lg shadow-lg p-2  transition-opacity duration-300'>
                                            {lessons.map((item, index) => {

                                                return (
                                                    <li key={index} className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                        href={"/"+lang.toLowerCase()+'/sections/'+item.id}>{item.title}</Link></li>
                                                )
                                            })}

                                            <li className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                href={`/${lang.toLowerCase()}/photo`}>Photo / Video</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Events</li>
                                <li className='text-[24px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>Support
                                    us
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='actions-parent'>
                        <div
                            className='relative w-[95%] m-auto h-[64px] bg-[#434343] rounded-full flex items-center justify-center'>
                            <ul className='h-full flex items-center justify-evenly w-full px-5 language-switcher'>
                                <li>
                                    <img className='w-[21px] h-[21px]' src='/user.png' alt='User' width={40}
                                         height={40}/>
                                </li>
                                <li className='text-white left-1 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                                    {lang} <DownOutlined className='w-[12px]'/>
                                    {isOpen && (
                                        <div
                                            className='absolute left-[5px] top-[60px] mt-2 w-32 bg-[#211d1dfc] text-white  rounded-xl shadow-xl p-2 transition-opacity duration-300 '>
                                            <ul>
                                                {languages.map(language => (
                                                    <li key={language.code}
                                                        className='p-2 hover:bg-[#4D4C4C] rounded-md transition-colors cursor-pointer'
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            setLang(language.text)
                                                            changeLanguage(language.code);
                                                        }}>
                                                        {language.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li className='lg:hidden text-white'>
                                    <MenuOutlined className='text-white text-2xl'
                                                  onClick={() => setMobileMenuOpen(true)}/>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </header>
            <Drawer title="Menu" placement="right" onClose={() => setMobileMenuOpen(false)} open={mobileMenuOpen}>
                <nav className='flex flex-col space-y-4'>
                    <Link href='/about'>About Us</Link>
                    <Link href='/archive'>Archive</Link>
                    <div className='cursor-pointer' onClick={() => setSectionsOpen(!sectionsOpen)}>
                        Sections <DownOutlined className={`ml-2 ${sectionsOpen ? 'rotate-180' : ''}`}/>
                    </div>
                    {sectionsOpen && (
                        <div className='pl-4'>
                            <ul className='space-y-2'>
                                <li><Link href='/dance'>Dance</Link></li>
                                <li><Link href='/theatre'>Theatre</Link></li>
                                <li><Link href='/vocals'>Vocals</Link></li>
                                <li><Link href='/photo'>Photo / Video</Link></li>
                            </ul>
                        </div>
                    )}
                    <Link href='/events'>Events</Link>
                    <Link href='/support'>Support Us</Link>
                </nav>
            </Drawer>
            <main>
                {children}
            </main>
            <footer
                className='absolute w-full  h-[360px] bg-[#2D2D2D] border-top border-t-2 border-[#BF3206] pt-[50px]'>
                <div className='container m-auto  flex items-center h-auto '>
                    <div className='w-1/3 footer-logo'>
                        <Image src='/logo.png' alt={"Logo"} className='w-[260px] h-[141px]' width={800} height={800}/>
                        <ul className='flex justify-evenly w-[240px]'>
                            <li className='text-[#C7C7C7]'><FacebookFilled/></li>
                            <li className='text-[#C7C7C7]'><FacebookFilled/></li>
                            <li className='text-[#C7C7C7]'><FacebookFilled/></li>
                        </ul>
                    </div>
                    <div className='w-1/3'>
                        <h3 className='text-[20px] text-[#F15A2B] font-bold '>Find Us</h3>
                        <ul>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]"><MailOutlined/></span> lineup2606@gmail.com
                            </li>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]"><PhoneOutlined/></span> +995 (592) 777 743
                            </li>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]"><PhoneOutlined/></span> +995 (574) 515 075
                            </li>
                            <li className="flex items-center gap-2 my-4 text-sm text-[#C7C7C7] font-semibold">
                                <span className="text-lg text-[#F15A2B]"><EnvironmentOutlined/></span> Akhalkalaki city,
                                Azatutyan 87/3
                            </li>
                        </ul>
                    </div>
                    <div className='w-1/3'>
                        <h3 className='text-[20px] text-[#F15A2B] font-bold'>Customers</h3>
                        <ul>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>FAQ</li>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>Process Returns/Exchange
                            </li>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>Refund/Return Policy</li>
                            <li className='my-[16px] text-[14px] text-[#C7C7C7] font-[600]'>Blog Post</li>
                        </ul>
                    </div>
                </div>
                <div className="container m-auto flex justify-end">
                    <div className='text-right text-[#C7C7C7]'>
                        <p>Copyright ©2025 </p>
                        <p>All rights reserved</p>
                        <p>The website is made by GeekLab Company</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default App;

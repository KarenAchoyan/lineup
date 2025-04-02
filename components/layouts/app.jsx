"use client"
import React, {useState} from 'react';
import Image from "next/image";
import {
    DownOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    FacebookFilled,
    MenuOutlined, InstagramOutlined, YoutubeOutlined
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
                        <Link href={"/"}>
                            <Image src='/logo.png' alt={"Logo"} className='w-[150px] h-[111px]' width={800}
                                   height={800}/>
                        </Link>
                    </div>
                    <div className='menu-parent hidden lg:block'>
                        <div className='w-[95%] m-auto h-[55px] bg-[#434343] rounded-full relative'>
                            <ul className='flex h-full items-center justify-evenly relative'>
                                <li className='text-[20px] text-white hover:text-[#F15A2B] hover:cursor-pointer relative '>
                                    <Link href={'/about'}>
                                        About us
                                    </Link>
                                </li>
                                <li className='text-[20px] text-white hover:text-[#F15A2B] hover:cursor-pointer'>
                                    <Link href={'/archive'}>
                                        Archive
                                    </Link>
                                </li>
                                <li className='text-[20px] text-white hover:text-[#F15A2B] hover:cursor-pointer relative dropdown'>
                                    <span>Sections</span>
                                    <div className='absolute hidden sub-dropdown  pt-3'>
                                        <ul className=' left-0 w-40 bg-[#211d1dfc] text-white rounded-lg shadow-lg p-2  transition-opacity duration-300'>
                                            {lessons.map((item, index) => {

                                                return (
                                                    <li key={index}
                                                        className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                        href={'/sections/' + item.id}>{item.title}</Link></li>
                                                )
                                            })}

                                            <li className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                href={`/photo`}>Photo / Video</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className='text-[20px] text-white hover:text-[#F15A2B] hover:cursor-pointer relative dropdown'>
                                    <span>Support us</span>
                                    <div className='absolute hidden sub-dropdown  pt-3'>
                                        <ul className=' left-0 w-40 bg-[#211d1dfc] text-white rounded-lg shadow-lg p-2  transition-opacity duration-300'>
                                            <li  className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                href={"/supports/volunteering"}>Volunteering</Link></li>
                                            <li  className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                href={'/supports/collaboration'}>Collaboration</Link></li>
                                            <li  className='p-2 text-[14px] rounded-md hover:bg-[#4D4C4C]'><Link
                                                href={'/supports/donation'}>Donation</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='actions-parent flex'>
                        <div
                            className='relative w-[95%] h-[55px] bg-[#434343] rounded-full flex items-center justify-center'>
                            <ul className='h-full flex items-center justify-evenly w-full  language-switcher'>
                                <li>
                                    <Link href={'/profile'}>
                                        <img className='w-[21px] h-[21px]' src='/user.png' alt='User' width={40}
                                             height={40}/>
                                    </Link>
                                </li>
                                <li className='lg:hidden text-white'>
                                    <MenuOutlined className='text-white text-2xl'
                                                  onClick={() => setMobileMenuOpen(true)}/>
                                </li>
                            </ul>
                        </div>

                        <div
                            className='relative w-[95%] mx-5 h-[55px] bg-[#434343] rounded-full flex items-center justify-center'>
                            <ul className='h-full flex items-center justify-evenly w-full language-switcher'>
                                <li className='text-white left-1 cursor-pointer flex' onClick={() => setIsOpen(!isOpen)}>
                                    {lang} <span className='ml-2'><DownOutlined className='w-[12px]'/></span>
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
                <nav className='flex flex-col space-y-4 mobile-menu'>
                    <Link className='text-[20px]' href='/about'>About Us</Link>
                    <Link className='text-[20px]' href='/archive'>Archive</Link>
                    <div className='cursor-pointer text-[20px]' onClick={() => setSectionsOpen(!sectionsOpen)}>
                        Sections <DownOutlined className={`ml-2 text-[13px] ${sectionsOpen ? 'rotate-180' : ''}`}/>
                    </div>
                    {sectionsOpen && (
                        <div className='pl-4'>
                            <ul className='space-y-2'>
                                <li className='text-[20px]'><Link href='/dance'>Dance</Link></li>
                                <li className='text-[20px]'><Link href='/theatre'>Theatre</Link></li>
                                <li className='text-[20px]'><Link href='/vocals'>Vocals</Link></li>
                                <li className='text-[20px]'><Link href='/photo'>Photo / Video</Link></li>
                            </ul>
                        </div>
                    )}
                    <Link className='text-[20px]' href='/support'>Support Us</Link>
                </nav>
            </Drawer>
            <main>
                {children}
            </main>
            <footer className='relative w-full bg-[#2D2D2D] border-t-2 border-[#BF3206] pt-[50px] pb-6'>
                <div className='container mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left px-4'>

                    {/* Logo & Social Icons */}
                    <div className='w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center md:items-start'>
                        <Image src='/logo.png' alt='Logo' className='w-[200px] h-auto' width={260} height={141} />
                        <ul className='w-[200px] flex space-x-4 mt-4 justify-center'>
                            <li className='text-[#C7C7C7] text-[22px] mx-[15px]'>
                                <a href="">
                                    <FacebookFilled />
                                </a>
                            </li>
                            <li className='text-[#C7C7C7] text-[22px] mx-[15px]'>
                                <a href="">
                                    <InstagramOutlined />
                                </a>
                            </li>
                            <li className='text-[#C7C7C7] text-[22px] mx-[15px]'>
                                <a href="">
                                    <YoutubeOutlined />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                        <h3 className='text-[20px] text-[#F15A2B] font-bold'>Find Us</h3>
                        <ul className='mt-4 space-y-4'>
                            <li className='flex items-center justify-center md:justify-start gap-2 text-sm text-[#C7C7C7] font-semibold'>
                                <MailOutlined className='text-lg text-[#F15A2B]' />
                                <a href='mailto:lineup2606@gmail.com' className='hover:underline'>lineup2606@gmail.com</a>
                            </li>
                            <li className='flex items-center justify-center md:justify-start gap-2 text-sm text-[#C7C7C7] font-semibold'>
                                <PhoneOutlined className='text-lg text-[#F15A2B]' />
                                <a href='tel:+995592777743' className='hover:underline'>+995 (592) 777 743</a>
                            </li>
                            <li className='flex items-center justify-center md:justify-start gap-2 text-sm text-[#C7C7C7] font-semibold'>
                                <PhoneOutlined className='text-lg text-[#F15A2B]' />
                                <a href='tel:+995574515075' className='hover:underline'>+995 (574) 515 075</a>
                            </li>
                            <li className='flex items-center justify-center md:justify-start gap-2 text-sm text-[#C7C7C7] font-semibold'>
                                <EnvironmentOutlined className='text-lg text-[#F15A2B]' />
                                Akhalkalaki city, Azatutyan 87/3
                            </li>
                        </ul>
                    </div>

                    {/* Customers Section */}
                    <div className='w-full md:w-1/3'>
                        <h3 className='text-[20px] text-[#F15A2B] font-bold'>Customers</h3>
                        <ul className='mt-4 space-y-4'>
                            <li className='text-[14px] text-[#C7C7C7] font-semibold hover:underline'>FAQ</li>
                            <li className='text-[14px] text-[#C7C7C7] font-semibold hover:underline'>Process Returns/Exchange</li>
                            <li className='text-[14px] text-[#C7C7C7] font-semibold hover:underline'>Refund/Return Policy</li>
                            <li className='text-[14px] text-[#C7C7C7] font-semibold hover:underline'>Blog Post</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className='container mx-auto text-center mt-6 text-[#C7C7C7] text-sm'>
                    <p>Copyright ©2025 </p>
                    <p>All rights reserved</p>
                    <p>The website is made by GeekLab Company</p>
                </div>
            </footer>
        </>
    );
};

export default App;

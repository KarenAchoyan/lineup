import React from 'react';
import Image from "next/image";

const Page = () => {
    return (
        <>
            <div className='w-full bg-[#232222] pt-[160px]'>
                <div className='container m-auto bg-[#4D4C4C] rounded-3xl'>
                    <h1 className='text-center my-5 text-[32px]  md:text-[45px] text-[#C7C7C7]'>Active Youth</h1>
                    <div className='w-[80%] m-auto pb-[50px]'>
                        <div>
                            <Image src={"/girl.jpeg"} width={250} height={250} className='rounded-full float-left m-3 mr-5'
                                   alt={"Avatar staff"}/>
                            <h2 className='text-[45px] text-[#F15A2B] font-bold'>David Anderson</h2>
                            <p className='text-[20px] text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor  et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus excepturi facere
                                molestias pariatur perferendis possimus praesentium qui, vel? Amet, consectetur dicta
                                dolor et eveniet fugit ipsam iste neque placeat vero.
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <div className='w-[48%] mt-10'>
                                <Image src="/img1.png" alt={"Image"} className='w-full  rounded-2xl' width={400} height={600} />
                            </div>
                            <div className='w-[48%]'>
                               <div className='w-full h-[300px] mt-10 rounded-2xl overflow-hidden'>
                                   <Image src="/1.png" alt={"Image"} className='h-full w-full object-cover' width={400} height={600} />
                               </div>
                               <div className='w-full h-[300px] mt-10 rounded-2xl overflow-hidden'>
                                   <Image src="/1.png" alt={"Image"} className='h-full w-full object-cover' width={400} height={600} />
                               </div>
                               <div className='w-full h-[300px] mt-10 rounded-2xl overflow-hidden'>
                                   <Image src="/1.png" alt={"Image"} className='h-full w-full object-cover' width={400} height={600} />
                               </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
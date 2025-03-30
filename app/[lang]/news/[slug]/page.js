import React from 'react';
import Image from "next/image";
import News from "@/components/news/news";

const Page = () => {
    return (
        <>
            <div className='w-full bg-[#232222] pt-[160px]'>
                <div className='container m-auto bg-[#4D4C4C] rounded-3xl'>
                    <div className='w-[80%] m-auto pb-[50px]'>
                        <h1 className='text-center my-5 text-[45px] text-[#C7C7C7]'>News</h1>
                        <Image width={1000} height={500} className='w-full' src={"/1.png"} alt={"News"}/>
                        <div className='w-[50%] py-10'>
                            <h1 className='text-[23px] sm:text-[30px] text-white font-bold'>Line Up and ARE dance ensembles return from
                                Italy</h1>
                        </div>
                        <p className='text-[20px] text-white '>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dolorem doloremque
                            exercitationem iusto molestias neque quae quis, quisquam recusandae reiciendis sequi
                            similique sint temporibus tenetur vel! Corporis culpa minus necessitatibus!
                        </p>
                    </div>

                </div>
                <h1 className='text-center text-[45px] text-[#C7C7C7] mt-[70px]'>Explore more</h1>
                <div className='py-5'>
                    <News/>
                </div>
                <div className='py-5'>
                    <News/>
                </div>
                <div className='py-5'>
                    <News/>
                </div>
                <div className='py-5'>
                    <News/>
                </div>
            </div>
        </>
    );
};

export default Page;
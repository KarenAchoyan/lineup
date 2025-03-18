const News = () => {
    return (
        <div className='w-full bg-[#232222] '>
            <div className="pt-20">
                <div
                    className='container m-auto bg-[#4D4C4C] p-[20px] rounded-2xl border-t-2 border-[#BF3206] h-auto   lg:h-[500px]'>
                    <h2 className=" text-[#C7C7C7] font-bold mb-6 text-center text-[45px]">News</h2>
                    <div className="flex flex-col md:flex-row items-start gap-8 ">
                        <div className="w-full md:w-1/2">
                            <iframe
                                className="w-full h-[340px]  rounded-lg"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen

                            ></iframe>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-[30px] font-semibold mb-4 text-[#C7C7C7]">Line Up and ARE dance
                                ensembles return from Italy</h3>
                            <p className="text-[20px]  font-medium text-white">
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
import Image from "next/image";
import Banner from "@/components/banner/banner";
import UserCarousel from "@/components/activeUsers/activeUsers";
import News from "@/components/news/news";

export default function Home() {
    return (
        <>
            <div className=''>
                <Banner/>
                <News/>
                <UserCarousel/>
            </div>
        </>
    );
}

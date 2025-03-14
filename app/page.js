import Image from "next/image";
import Banner from "@/components/banner/banner";
import UserCarousel from "@/components/activeUsers/activeUsers";
import News from "@/components/news/news";
import Achievements from "@/components/achievements/achievements";
import CalendarEvent from "@/components/event/event";

async function getActiveUsers() {
    const res = await fetch('http://127.0.0.1:8000/api/actives');
    const data = await res.json();
    return data;
}
async function getGallery() {
    const res = await fetch('http://127.0.0.1:8000/api/galleries');
    const data = await res.json();
    return data;
}
async function getVideos() {
    const res = await fetch('http://127.0.0.1:8000/api/videos/last');
    const data = await res.json();
    return data;
}

export default async function Home() {
    const activeUsers = await getActiveUsers();
    const galleries = await getGallery();
    const videos = await getVideos();

    return (
        <>
            <div className=''>
                <Banner/>
                <News/>
                <UserCarousel users={activeUsers} />
                <Achievements galleries={galleries} videos={videos}/>
                <CalendarEvent/>
            </div>
        </>
    );
}

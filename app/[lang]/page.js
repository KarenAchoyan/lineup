import Image from "next/image";
import Banner from "@/components/banner/banner";
import UserCarousel from "@/components/activeUsers/activeUsers";
import News from "@/components/news/news";
import Achievements from "@/components/achievements/achievements";
import CalendarEvent from "@/components/event/event";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {MainProvider} from "@/providers/HomeProvider";

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

export default async function Home({params}) {
    const {lang} = await params
    // const dict = await getDictionary(lang) // en

    const activeUsers = await getActiveUsers();
    const galleries = await getGallery();

    return (
        <>
            <MainProvider value={{lang, users:activeUsers, galleries}}>
                <Banner/>
                <News title="News"/>
                <UserCarousel/>
                <Achievements all={true}/>
                <CalendarEvent/>
            </MainProvider>
        </>
    );
}
